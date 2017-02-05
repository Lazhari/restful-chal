'use strict';

const Image = require('../../../../models/image');

module.exports = {
    getImageById(imageId) {
        return Image.findById(imageId).exec();
    },
    createImage(image) {
        const imageInstance = new Image(image);
        return imageInstance.save();
    }
};
