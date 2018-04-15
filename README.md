# hetic-w2-p2019-05

https://fervent-cray-d32469.netlify.com/

### How to install

After downloading the project repository, you will need to install the dependencies:
```bash
# If using npm
npm install
# or if using yarn
yarn install
```

### How to use

In order to run the project in development mode, you will need to use next command:
```bash
# with npm
npm run dev

# or with yarn
yarn run dev
```

These commands will open the project in your browser.

### Build for production

Use the following commands to build the project for production (the built project will be created in directory `build`):
```bash
# with npm
npm run build

# with yarn
yarn run build
```

### Deploy using this repository's compose file (+ bonus bash script)

In order for this section to work, you first need to install both:
  - docker (engine)
  - docker-compose (minimum v.2)

`docker-compose` file will mount the `build` folder (need to run the command `npm run build` beforehand), to a nginx container, and link container's port 80 to your machine's port 3000.

Bash Script automates these steps (`npm install`, `npm run build` and `docker-compose down` + `docker-compose up`). As you may not have (and not need) nodejs/npm on your machine, the npm commands are being ran inside docker ***node:latest*** containers.
