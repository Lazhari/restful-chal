'use strict';

const config = require('../config/enviroment');

const APIROOT = `/api/${config.apiVersion}`;

module.exports = function(app) {
    app
        .use('/', require('./app'))
        .use(`${APIROOT}/images`, require('./api/images'))
        .use(`${APIROOT}/products`, require('./api/products'))
        .use(`${APIROOT}/items`, require('./api/items'));
};
