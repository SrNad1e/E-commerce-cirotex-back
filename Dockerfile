FROM node:18.13.0
ENV TZ="America/Bogota"

COPY ["package.json","yarn.lock","/app/"]

WORKDIR /app

RUN yarn

COPY [".","."]

EXPOSE 8080

RUN yarn build

CMD ["node","dist/main.js"]