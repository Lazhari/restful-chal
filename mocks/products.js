'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const faker = require('faker');
const async = require('async');

const config = require('../config/enviroment');
const Product = require('../models/product');

const generateRandomSku = function() {
    return Math.random().toString(16).slice(10).toUpperCase();
};
/**
* Create new fake product
*/
const createProduct = function(iteration, done) {
    const product =  {
        sku: generateRandomSku(),
        name: faker.commerce.productName(),
    };
    return done(null, product);
};

mongoose.connect(config.mongo.uri, (err) => {
    if(err) {
        console.error(`Connection to database not established, please check your MongoDB connection maybe the reason is ${err.message}`);
    } else {
        async.times(50, async.apply(createProduct), function(err, products) {
            Product.insertMany(products, (err) => {
                if(err) {
                    console.error('Something went wrong');
                } else {
                    console.log('Products has been added to database');
                }
                process.exit(0);
            });
        });
    }
});
