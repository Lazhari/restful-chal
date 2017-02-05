'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const app = express();

require('./config/express')(app);

module.exports = app;