'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router
    .get('/:imageId', controller.getImageById)
    .post('/', controller.createImage);

module.exports = router;
