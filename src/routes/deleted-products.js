const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs.js');
const  { DeletedProduct}  = require('../db.js');
const authenticateToken = require('../middleware/authenticateToken.js');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const deletedProductsList = await DeletedProduct.findAll();
        res.status(200).json({deletedProductsList: [...deletedProductsList], status:200});
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    };
});

module.exports = router;