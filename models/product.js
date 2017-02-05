'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema({
    sku: String,
    name: String,
    items: [{
        type: ObjectId,
        ref: 'Item'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

productSchema.pre('update', function() {
    this.update({}, {
        $set: {
            updated: new Date()
        }
    });
});

module.exports = mongoose.model('Product', productSchema, 'products');
