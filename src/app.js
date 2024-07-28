//Imports required
const express = require('express');
const routes = require('./routes/index.js');
const { morganLogging, bodyParserUrlencoded, bodyParseJson, configCors, errorHandler, notFoundHandler, swaggerConfig } = require('./middleware/configServer.js');

//Init
const server = express();
server.name = 'API';

//Config
server.use(
  morganLogging,
  bodyParserUrlencoded,
  bodyParseJson,
  configCors,
);

//Routes
server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.use(
  '/',
  routes,
);

//Swagger route 
const [swaggerEndpoint, swaggerServe, swaggerSetup] = swaggerConfig();
server.use(
  swaggerEndpoint,
  swaggerServe,
  swaggerSetup
);

//Handlers
server.use(
  errorHandler,
  notFoundHandler,
);

//Modules exports
module.exports = server;
