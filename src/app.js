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
server.use(
  '/',
  routes,
);

//Swagger route 
const [swaggerEndpoint, swaggerServe, swaggerSetup] = swaggerConfig();
server.use(swaggerEndpoint, (req, res, next) => {
  res.setHeader('Content-Security-Policy', `script-src 'self'`);
  next();
},
swaggerServe,
swaggerSetup,
);

//Handlers
server.use(
  notFoundHandler,
  errorHandler,
);

//Modules exports
module.exports = server;
