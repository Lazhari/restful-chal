'use strict';

const Item = require('../../../../models/item');

module.exports = {
    aggregateItems() {
        const pipeline = [
            // Stage 1: Lock for color
            {
                $lookup: {
                    "from": "colors",
                    "localField": "color",
                    "foreignField": "_id",
                    "as": "color"
                }
            },
            // Stage 2: lock for product infos
            {
                $lookup: {
                    "from": "products",
                    "localField": "product_id",
                    "foreignField": "_id",
                    "as": "product"
                }
            },
            // Stage 3: get color and project object
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
            // Stage 4: lock for image info
            {
                $lookup: {
                    "from": "images",
                    "localField": "color.image_id",
                    "foreignField": "_id",
                    "as": "image_url"
                }
            },
            // Stage 5: format document
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

        ];

        return Item.aggregate(pipeline).exec();

    }
};
