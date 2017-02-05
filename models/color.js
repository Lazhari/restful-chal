'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ColorSchema = new Schema({
    product_id: {
        type: ObjectId,
        red: 'Product'
    },
    label: String,
    image: {
        type: ObjectId,
        ref: 'Image'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

ColorSchema.pre('update', function() {
    this.update({}, {
        $set: {
            updated: new Date()
        }
    });
});

module.exports = mongoose.model('Color', ColorSchema, 'colors');
