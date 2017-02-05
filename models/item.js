'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ItemSchema = new Schema({
    product_id: {
        type: ObjectId,
        red: 'Product'
    },
    product_name: String,
    product_sku: String,
    size: String,
    price: Number,
    color: {
        type: ObjectId,
        ref: 'Color'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

ItemSchema.pre('update', function() {
    this.update({}, {
        $set: {
            updated: new Date()
        }
    });
});

module.exports = mongoose.model('Item', ItemSchema, 'items');
