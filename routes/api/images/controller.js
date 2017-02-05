'use strict';

const imageHelper = require('./helpers');

module.exports = {
    getImageById(req, res) {
        req.checkParams('imageId', 'The Image unique ID is invalid').isMongoId();

        const errors = req.validationErrors();
        if(errors) {
            return res.send(400, {
                status: 400,
                message: errors[0].msg,
                errors: errors
            });
        } else {
            const imageId = req.params.imageId;
            imageHelper.getImageById(imageId)
                .then((image) => {
                    if(image) {
                        return res.send(200, {
                            url: image.url
                        });
                    } else {
                        return res.send(404, {
                            status: 404,
                            message: 'Image not Found!'
                        });
                    }
                })
                .catch((err) => {
                    return res.send(500, {
                        status: 500,
                        message: 'Something went wrong'
                    });
                });
        }
    },
    createImage(req, res) {
        req.checkBody('url', 'The image url is invalid').isURL();
        const errors = req.validationErrors();

        if(errors) {
            return res.send(400, {
                status: 400,
                message: errors[0].msg,
                errors: errors
            });
        } else {
            imageHelper.createImage(req.body)
                .then((image) => {
                    return res.send(201, {
                        status: 201,
                        message: 'Your image has been successfully added!',
                        data: image
                    });
                })
                .catch((err) => {
                    return res.send(500, {
                        status: 500,
                        message: 'Something went wrong'
                    });
                });
        }
    }
};
