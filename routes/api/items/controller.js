'use strict';

const itemsAggegator = require('./helpers/aggregator');

module.exports = {
    getItems(req, res) {
        /**
         * @api {get} /api/v1/items Request Items
         * @apiDescription Get all items not grouped. An items also includes the properties of the product it
belongs to.
         * @apiName GetItems
         * @apiGroup items
         *
         *
         * @apiSuccess {Number} status The response status.
         * @apiSuccess {Object[]} data Items list.
         * @apiSuccess {String} data._id Item unique ID.
         * @apiSuccess {String} data.size Item size.
         * @apiSuccess {Number} data.price Item price.
         * @apiSuccess {String} data.product_sku stock keeping unit.
         * @apiSuccess {String} data.product_name Product name.
         * @apiSuccess {String} data.color Item Color.
         * @apiSuccess {String} data.image_url Item image url.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *    {
         *        "status": 200,
         *        "data": [{
         *            "_id": "58973021655fe6d018b678a3",
         *            "size": "XL",
         *            "price": 72.27004986029765,
         *            "product_sku": "2CCB5",
         *            "product_name": "Practical Frozen Fish",
         *            "product_id": "58972f875d249ecfeb62f670",
         *            "color": "orchid",
         *            "image_url": "http://lorempixel.com/640/480/fashion"
         *        }, {
         *            "_id": "58973021655fe6d018b678a4",
         *            "size": "L",
         *            "price": 63.83881726853471,
         *            "product_sku": "2CCB5",
         *            "product_name": "Practical Frozen Fish",
         *            "product_id": "58972f875d249ecfeb62f670",
         *            "color": "orchid",
         *            "image_url": "http://lorempixel.com/640/480/fashion"
         *        }, ...]
         *    }
         *
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 500 Not Found
         *     {
         *       "status": 500,
         *       "message": "Something went wrong!",
         *       "error": "Error message"
         *     }
         */
        itemsAggegator.aggregateItems()
            .then((items) => {
                return res.send(200, {
                    status: 200,
                    data: items
                });
            })
            .catch(err => {
                return res.send(500, {
                    status: 500,
                    message: 'Something went wrong!',
                    error: err.message
                });
            });
    }
};
