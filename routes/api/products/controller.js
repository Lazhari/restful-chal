'use strict';
const productAggregator = require('./helpers/aggregator');
module.exports = {
    getProducts(req, res, next) {
        productAggregator.groupProductBySku()
            .then(products => {
                return res.send(200, {
                    status: 200,
                    data: products
                });
            })
            .catch(err => {
                return res.send(500, {
                    status: 500,
                    message: 'Something went wrong',
                    errors: err.message
                });
            });
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
