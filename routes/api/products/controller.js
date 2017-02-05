'use strict';

module.exports = {
    getProducts(req, res, next) {
        return res.send('Get products by thier items and thier image grouped bt sku');
    },
    createNewProduct(req, res, next) {
        return res.send('Create a new Product');
    },
    deleteProduct(req, res, next) {
        return res.send('Detele product by ID');
    },
    updateProduct(req, res, next) {
        return res.send('Update a product by thier ID');
    }
};
