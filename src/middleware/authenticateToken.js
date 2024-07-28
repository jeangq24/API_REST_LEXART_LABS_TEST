const jwt = require('jsonwebtoken');
const logger = require('../lib/logs');


const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        const message = 'This request must be authenticated and no token was found';
        const status = 404;
        logger.error(message);
        return res.status(404).json({error: message , status});
    };

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            const message= `Unauthorized -  Invalid token`
            const status= 401;
            logger.error(`${message}: ${err}`);
            return res.status(status).json({error: message, status});
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
