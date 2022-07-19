FROM node:16.14.2

COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD [ "npm", "run", "prod" ]