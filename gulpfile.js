var babelify = require('babelify');
var browserify = require('browserify')
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-csso');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('browser-sync').create();
var uglify = require('gulp-uglify');

var isProd = process.env.NODE_ENV === 'production';

/**
 * PUG
 */

function templates() {
  return gulp.src('src/pages/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(sync.stream());
}

/**
 * SCSS
 */

function scss() {
  return gulp.src('src/scss/styles.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(isProd, minifyCSS()))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
}

/**
 * JS
 */

function js() {
  return browserify({entries: ['src/js/script.js'], debug: true})
    .transform(babelify, {presets: 'es2015'})
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
    .pipe(uglify())
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
};

/**
 * IMAGES
 */

function images() {
  return gulp.src('src/img/**/*')
    .pipe(gulpif(isProd, imagemin({verbose: true})))
    .pipe(gulp.dest('dist/img'));
}

/**
 * FONTS
 */

function fonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

/**
 * GLOBAL
 */

function clean() {
  return del(['dist']);
}

gulp.task('build', gulp.series(clean, gulp.parallel(templates, scss, js, images, fonts)));

gulp.task('default', gulp.parallel(templates, scss, js, images, fonts, function(done) {
  sync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('src/**/*.pug', templates);
  gulp.watch('src/**/*.scss', scss);
  gulp.watch('src/**/*.js', js);

  done();
}));
