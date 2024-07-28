const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const { Person, User, Rol } = require('../db');
const { Op } = require('sequelize');


router.post('/', async (req, res) => {
    try {
        const { name, last_name, birthdate, username, email, password, rol } = req?.body;

        if (!name || !last_name || !birthdate || !username || !email || !password || !rol) {
            logger.info(`Failed. The data necessary for this request has not been sent: name, surname, date of birth, rol, username, email and password.`);
            return res.status(400).json({ 
                error: `Failed. The data necessary for this request has not been sent: name, surname, date of birth, rol, username, email and password.`,
                status: 400
            });

        };

        if (password.length < 8 || password.length > 30) {
            logger.info(`password length is 8 to 30 characters`);
            return res.status(400).json({ 
                error: `password length is 8 to 30 characters`,
                status: 400 
            });
        }

        const exitsUser = await User.findAll({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        });

        if (exitsUser?.length > 0) {
            logger.info(`The user already exists, please select another email or username.`);
            return res.status(409).json({ 
                error: 'The user already exists, please select another email or username.',
                status: 409
         });
        };

        const existsRol = await Rol.findOne({ where: { id: rol.toLowerCase() } });
        if (!existsRol) {
            logger.info(`The provided role does not exist`);
            return res.status(404).json({ 
                error: 'The provided role does not exist',
                status: 404
            });
        };
        const createdPerson = await Person.create({ name, last_name, birthdate });
        const createdUser = await User.create({ username, email, password });
        await createdUser.setPerson(createdPerson);
        await createdUser.setRol(existsRol);

        logger.info('User created successfully');
        return res.status(200).json({
            user: {
                id: createdUser.id, 
                username: createdUser.username, 
                email: createdUser.email,
                rol: createdUser.RolId,
            },
            status: 200
        });

    } catch (error) {

        logger.error(`Error: ${error}`);
        return res.status(500).json({ 
            error: 'Internal server error: ',
            status: 500
        });
    }
});


module.exports = router;