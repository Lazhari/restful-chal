'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ImageSchema = new Schema({
    url: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

ImageSchema.pre('update', function() {
    this.update({}, {
        $set: {
            updated: new Date()
        }
    });
});

module.exports = mongoose.model('Image', ImageSchema, 'images');
