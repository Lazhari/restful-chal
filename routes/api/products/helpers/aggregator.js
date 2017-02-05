'use strict';

const Item = require('../../../../models/item');

module.exports = {
    groupProductBySku() {
        const pipeline = [
            // lock for colors
            {
                $lookup: {
                    "from": "colors",
                    "localField": "color",
                    "foreignField": "_id",
                    "as": "color"
                }
            },
            // lock for product
            {
                $lookup: {
                    "from": "products",
                    "localField": "product_id",
                    "foreignField": "_id",
                    "as": "product"
                }
            },
            // Project product and colors
            {
                $project: {
                    product: {
                        $arrayElemAt: ["$product", 0]
                    },
                    color: {
                        $arrayElemAt: ["$color", 0]
                    },
                    size: true,
                    price: true
                }
            },
            // lock for images
            {
                $lookup: {
                    "from": "images",
                    "localField": "color.image_id",
                    "foreignField": "_id",
                    "as": "image_url"
                }
            },
            // format documents
            {
                $project: {
                    size: true,
                    price: true,
                    product_sku: "$product.sku",
                    product_name: "$product.name",
                    product_id: "$product._id",
                    color: "$color.label",
                    image_url: {
                        $arrayElemAt: ["$image_url.url", 0]
                    }
                }
            },
            // group items by products
            {
                $group: {
                    _id: "$product_id",
                    sku: {
                        $first: "$product_sku"
                    },
                    name: {
                        $first: "$product_name"
                    },
                    items: {
                        $push: "$$ROOT"
                    }
                }
            },
            // group product by SKU
            {
                $group: {
                    _id: "$sku",
                    products: {
                        $push: "$$ROOT"
                    }
                }
            },
            // Project sku and remove _id
            {
                $project: {
                    sku: "$_id",
                    _id: false,
                    products: true
                }
            },
        ];
        return Item.aggregate(pipeline).exec();
    }
};
