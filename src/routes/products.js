const { Router } = require('express');
const router = Router();
const logger = require('../lib/logs');
const { Product, DeletedProduct } = require('../db.js');
const authenticateToken = require('../middleware/authenticateToken.js');


router.post('/', authenticateToken, async (req, res) => {
    try {


        const { name, lot_number, price, stock, entry_date } = req?.body;

        if (!name || !lot_number || !price || !stock || !entry_date) {
            logger.info(`Failed. The data necessary for this request has not been sent: name lotnumber price stock entry date`);
            return res.status(400).json({
                error: `Failed. The data necessary for this request has not been sent: name lotnumber price stock entry date`,
                status: 400
            });
        };

        if (stock < 0) {
            logger.info(`Stock cannot be less than 0`);
            return res.status(400).json({
                error: `Stock cannot be less than 0`,
                status: 400
            });
        }
        const createdProduct = await Product.create({product: {name, lot_number, price, stock, entry_date,}, status: 200 });
        logger.info('Successfully created product')
        res.status(200).json(createdProduct);

    } catch (error) {

        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    }
});


router.post('/bulk', authenticateToken, async (req, res) => {
    try {
        const listProducts = require("../lib/listFakeProducts.js");
        await Product.bulkCreate(listProducts);
        logger.info('Successfully loaded 50 products');
        res.status(200).json({ message: 'Products successfully loaded', status: 200 });
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    }
});


router.get('/', authenticateToken, async (req, res) => {
    try {
        const productsList = await Product.findAll();
        res.status(200).json({ productsList: [...productsList], status: 200 });
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    }
});


router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lot_number, price, stock, entry_date } = req.body;
        if (!id) {
            const messageError = "No product id found in query parameters";
            logger.info(messageError);
            return res.status(400).json({ error: messageError, status: 400 });

        };

        const product = await Product.findByPk(id);

        if (!product) {
            logger.error('Product not found');
            return res.status(404).json({ error: 'Product not found', status: 404 });
        };

        product.name = name || product.name;
        product.lot_number = lot_number || product.lot_number;
        product.price = price || product.price;
        product.stock = ((stock < 0) ? false : stock) || product.stock;
        product.entry_date = entry_date || product.entry_date;

        await product.save();

        logger.info('The product was successfully updated');
        return res.status(200).json({ product:{...product?.dataValues}, status: 200 });

    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    };
});


router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const messageError = "No product id found in query parameters";
            logger.info(messageError);
            return res.status(400).json({ error: messageError, status: 400 });

        };

        const product = await Product.findByPk(id);
        if (!product) {
            logger.error('Product not found');
            return res.status(404).json({ error: 'Product not found', status: 404 });
        };

        const deletedProductData = {
            name: product.name,
            lot_number: product.lot_number,
            price: product.price,
            stock: product.stock,
            entry_date: product.entry_date,
            deleted_at: new Date().toString()
        };

        await DeletedProduct.create(deletedProductData);
        await product.destroy();
        logger.error("Product deleted successfully and history saved");
        return res.status(200).json({ message: 'Product deleted successfully and history saved', status: 200 });

    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    };
});


router.delete('/delete/all', authenticateToken, async (req, res) => {
    try {
        const products = await Product.findAll();
        console.log(products)
        if (products.length === 0) {
            return res.status(200).json({ message: 'No products to delete', status: 200 });
        }

        const deletedProducts = products.map(product => ({
            name: product.name,
            lot_number: product.lot_number,
            price: product.price,
            stock: product.stock,
            entry_date: product.entry_date,
            deleted_at: new Date().toString()
        }));

        await DeletedProduct.bulkCreate(deletedProducts);
        await Product.destroy({ where: {}, truncate: false });

        logger.info('All products successfully deleted and history saved');
        return res.status(200).json({ message: 'All products successfully deleted and history saved', status: 200 });
    } catch (error) {
        logger.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Internal server error', status: 500 });
    }
});

module.exports = router;