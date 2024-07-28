//Imports required
const express = require('express');
const routes = require('./routes/index.js');
const { morganLogging, bodyParserUrlencoded, bodyParseJson, configCors, errorHandler, notFoundHandler, swaggerConfig } = require('./middleware/configServer.js');
const path = require("path")

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
server.use(
  '/',
  routes,
);

//Swagger route 
const __swaggerDistPath = path.join(
  __dirname,
  'node_modules',
  'swagger-ui-dist'
);

const [swaggerEndpoint, swaggerServe, swaggerSetup] = swaggerConfig();

server.use(swaggerEndpoint,
  express.static(__swaggerDistPath, { index: false }), 
  swaggerServe,
  swaggerSetup
);
//Handlers
server.use(
  notFoundHandler,
  errorHandler,
);

//Modules exports
module.exports = server;
