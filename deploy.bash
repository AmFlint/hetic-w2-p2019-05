# Installing dependencies in docker container
docker run -v $(pwd):/application -w /application node npm install
# Building application
docker run -v $(pwd):/application -w /application node npm run build
# Down compose
docker-compose down
# Up with modifications
docker-compose up
