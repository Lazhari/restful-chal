'use strict';

const itemsAggegator = require('./helpers/aggregator');

module.exports = {
    getItems(req, res) {
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
                    message: 'Something went wrong',
                    errors: err.message
                });
            });
    }
};
