const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const logger = require('../lib/logs');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const authenticateToken = require("../middleware/authenticateToken");
/**
 * @api {post} /auth Request login
 * @apiName PostAuth
 * @apiGroup Auth
 *
 * @apiBody {email} email User String.
 * @apiBody {password} password User String.
 *
 * @apiSuccess {JSON} Object user.
 */
router.post('/', async (req, res) => {
    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            logger.error('Failed. The data necessary for this request has not been sent: email, password.');
            return res.status(400).json({
                error: `Failed. The data necessary for this request has not been sent: email, password.`,
                status: 400
            });
        };
        let infoString;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            infoString = 'User not found';
            logger.error(infoString)
            return res.status(404).json({
                error: infoString,
                status: 404
            });
        };

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            infoString = 'Invalid password'
            return res.status(401).json({
                error: infoString,
                status: 401
            });
        };

        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, rol: user.RolId }, SECRET_KEY, { expiresIn: '24h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.ENV_DEV ? false : true,
            sameSite: process.env.ENV_DEV ? 'Lax' : 'None',
            maxAge: 24 * 60 * 60 * 1000,
            partitioned: process.env.ENV_DEV ? false : true,
        });

        const { id, username, personId } = user;
        infoString = 'Login completed'
        logger.info(infoString);
        return res.status(200).json({
            user: {
                id,
                email: user.email,
                username,
                personId,
                rol: user.RolId
            },
            status: 200
        });

    } catch (error) {

        logger.error(`Error: ${error}`);
        return res.status(500).json({
            error: 'Internal server error',
            status: 500
        });
    }
});

/**
 * @api {get} /auth/check-session' Request Check Session 
 * @apiName GetAuthCheckSession
 * @apiGroup Auth
 * 
 * @apiSuccess {JSON} Object user.
 */
router.get('/check-session', authenticateToken, (req, res) => {
    try {
        res.status(200).json({message: "Authenticated", user: req.user });
        return;
        
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({
            error: 'Internal server error',
            status: 500
        });
    }
});
/**
 * @api {post} /auth/logout Request log Out session
 * @apiName PostAuthLogOut
 * @apiGroup Auth
 *
 * @apiSuccess {JSON} Object message and status.
 */
router.post('/logout', authenticateToken, (req, res) => {
    try {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: process.env.ENV_DEV ? false : true });
        logger.info("Logged out");
        res.status(200).json({ message: 'Logged out', status: 200 });

        return;
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({
            error: 'Internal server error',
            status: 500
        });
    }

});

module.exports = router;