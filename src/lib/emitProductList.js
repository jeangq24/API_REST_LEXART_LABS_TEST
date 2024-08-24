const { getIo } = require("./socket.js");
const logger = require('./logs.js');
const { Product } = require('../db.js');

const emitProductList = async () => {
    try {
        const socket = getIo();
        const productsList = await Product.findAll();
        socket.emit('updateProductList', productsList);
        logger.info('[ Socket ] - emit updateProductList');
        return productsList;
    } catch (error) {
        logger.error(`Error getting product list: ${error}`);
        return;
    }
};

module.exports = emitProductList;