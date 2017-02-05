'use strict';
const productAggregator = require('./helpers/aggregator');
module.exports = {
    /**
     * @api {get} /api/v1/products Request products
     * @apiDescription Get all products with their items and their images, grouped by product.sku.
     * @apiName GetItems
     * @apiGroup Products
     *
     * @apiSuccess {Number} status The response status.
     * @apiSuccess {Object[]} data Items list.
     * @apiSuccess {String} data.sku Stock keeping unit.
     * @apiSuccess {Object[]} data.products Products list by Stock keeping unit.
     * @apiSuccess {Object[]} data.products._id product unique ID.
     * @apiSuccess {Object[]} data.products.name product name.
     * @apiSuccess {Object[]} data.products.items product items list.
     * @apiSuccess {Number} data.price Item price.
     * @apiSuccess {String} data.product_sku stock keeping unit.
     * @apiSuccess {String} data.product_name Product name.
     * @apiSuccess {String} data.color Item Color.
     * @apiSuccess {String} data.image_url Item image url.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *         {
     *            "status": 200,
     *            "data": [{
     *                    "sku": "433C8",
     *                    "products": [{
     *                        "_id": "58972f875d249ecfeb62f67e",
     *                        "sku": "433C8",
     *                        "name": "Small Frozen Shirt",
     *                        "items": [{
     *                            "_id": "58973021655fe6d018b6790f",
     *                            "size": "XL",
     *                            "price": 82.32666942964838,
     *                            "product_sku": "433C8",
     *                            "product_name": "Small Frozen Shirt",
     *                            "product_id": "58972f875d249ecfeb62f67e",
     *                            "color": "yellow",
     *                            "image_url": "http://lorempixel.com/640/480/fashion"
     *                        }, {
     *                            "_id": "58973021655fe6d018b67910",
     *                            "size": "L",
     *                            "price": 68.98897749405263,
     *                            "product_sku": "433C8",
     *                            "product_name": "Small Frozen Shirt",
     *                            "product_id": "58972f875d249ecfeb62f67e",
     *                            "color": "yellow",
     *                            "image_url": "http://lorempixel.com/640/480/fashion"
     *                        }, ..]
     *                    }..., ]
     *                }
     *         }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 500 Not Found
     *     {
     *       "status": 500,
     *       "message": "Something went wrong!",
     *       "error": "Error message"
     *     }
     */
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
