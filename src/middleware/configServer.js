const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../lib/logs.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const combineSwaggerFiles = require('../lib/combineSwaggerFiles.js');

// Middleware logging
const morganLogging = morgan('dev', {
    stream: {
        write: message => logger.info(message.trim())
    }
})


// Config middlewares
const bodyParserUrlencoded = bodyParser.urlencoded({ extended: true, limit: '50mb' });
const bodyParseJson = bodyParser.json({ limit: '50mb' });
const parserCookie = cookieParser();


// Config de CORS
const configCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    return;
};

// error handler
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    logger.error('Error:', err);
    res.status(status).send({
        error: {
            status,
            message,
        },
    });

    return;
};


// routes not found 

const notFoundHandler = (req, res) => {
    const status = 404;
    const message = 'Enpoint Not Found';
    logger.warn(`404 - Not Found - Endpoint: ${req.originalUrl.toString()} - Method: ${req.method.toString()}`);
    res.status(status).send({
        error: {
            status,
            message,
        },
    });

    return;
};


//Swagger config
const swaggerConfig = () => {
    const swaggerEndpoint = '/api-docs';
    const swaggerSpec = combineSwaggerFiles();
    return [
        swaggerEndpoint,
        swaggerUi.serve,
        swaggerUi.setup(swaggerJsDoc(
            swaggerSpec
        )),
    ]
}

module.exports = {
    morganLogging, bodyParserUrlencoded, bodyParseJson, parserCookie, configCors, errorHandler, notFoundHandler, swaggerConfig
};
