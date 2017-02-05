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

/**
* Create new fake fashion color
*/
const createFakeColor = function(products, images, done) {
    const color =  {
        product_id: _.sample(products),
        image_id: _.sample(images),
        label: faker.commerce.color()
    };
    return done(null, color);
};

const getProductsIds = function(done) {
    Product.distinct('_id', done);
};

const getImageIds = function(done) {
    Image.distinct('_id', done);
};

mongoose.connect(config.mongo.uri, (err) => {
    if(err) {
        console.error(`Connection to database not established, please check your MongoDB connection maybe the reason is ${err.message}`);
    } else {
        async.auto({
            products: async.apply(getProductsIds),
            images: async.apply(getImageIds)
        }, (err, data) => {
            if(err) {
                console.log('Something went wrong!');
                process.exit(1);
            } else {
                async.times(50, (n, next) => {
                    createFakeColor(data.products, data.images, next);
                }, function(err, colors) {
                    Color.insertMany(colors, (err) => {
                        if(err) {
                            console.error('Something went wrong');
                        } else {
                            console.log('Color has been added to database');
                        }
                        process.exit(1);
                    });
                });
            }
        });
    }
});
