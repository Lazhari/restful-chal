'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./controller');

router
    .get('/', controller.getProducts)
    .post('/', controller.createNewProduct)
    .delete('/:productId', controller.deleteProduct)
    .put('/:productId', controller.updateProduct);

module.exports = router;
