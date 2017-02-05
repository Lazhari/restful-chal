'use strict';
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const faker = require('faker');
const async = require('async');

const config = require('../config/enviroment');
const Image = require('../models/image');

/**
* Create new fake fashion image
*/
const createFakeImage = function(iteration, done) {
    const image =  {
        url: faker.image.fashion()
    };
    return done(null, image);
};

mongoose.connect(config.mongo.uri, (err) => {
    if(err) {
        console.error(`Connection to database not established, please check your MongoDB connection maybe the reason is ${err.message}`);
    } else {
        async.times(50, async.apply(createFakeImage), function(err, images) {
            Image.insertMany(images, (err) => {
                if(err) {
                    console.error('Something went wrong');
                } else {
                    console.log('Images has been added to database');
                }
                process.exit(0);
            });
        });
    }
});
