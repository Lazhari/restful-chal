'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const faker = require('faker');
const async = require('async');
const _ = require('lodash');

const config = require('../config/enviroment');
const Color = require('../models/color');
const Product = require('../models/product');
const Image = require('../models/image');
const Item = require('../models/item');

/**
* Create new fake fashion color
*/
const createFakeItem = function(product, colors, done) {
    const item =  {
        product_id: product._id,
        size: _.sample(['S', 'M', 'L', 'XL', 'XXL']),
        price: _.random(10.2, 90.2),
        color: _.sample(colors)
    };
    return done(null, item);
};

const getColorIds = function(productId, done) {
    Color.distinct('_id', {product_id: productId}, done);
};

mongoose.connect(config.mongo.uri, (err) => {
    if(err) {
        console.error(`Connection to database not established, please check your MongoDB connection maybe the reason is ${err.message}`);
    } else {
        Product.find({})
            .exec()
            .then((products) => {
                const pace = require('pace')(products.length);
                async.eachSeries(products, (product, done) => {
                    getColorIds(product._id, (err, colors) => {
                        if(err) {
                            return done(null);
                        }
                        const ramdonNumberOfItems = _.random(5, 10);
                        async.times(ramdonNumberOfItems, (n, next) => {
                            createFakeItem(product, colors, next);
                        }, function(err, items) {
                            if(err) {
                                console.log('Something went wrong please try again');
                            }
                            Item.insertMany(items, (err) => {
                                if(err) {
                                    console.error('Something went wrong');
                                } else {
                                    console.log('The items has been added to database');
                                }
                                pace.op();
                                return done(null);
                            });
                        });
                    });
                }, (err) => {
                    if(err) {
                        console.log('Something went wrong');
                    } else {
                        console.log('Done');
                    }
                    process.exit(0);
                });
            })
            .catch(err => {
                console.log(err.message);
                console.log('Error! please check the README for mocks data generator.');
            });
    }
});
