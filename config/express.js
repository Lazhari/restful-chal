'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lusca = require('lusca');
const expressNunjucks = require('express-nunjucks');

const config = require('./enviroment');

var basicAuth = require('basic-auth');

module.exports = function (app) {

    // view engine setup
    // This is where all the magic happens!
    // Check the environment if is dev
    const isDev = app.get('env') === 'development';

    // view engine setup
    app.set('views', path.join(config.root, './views'));
    // Config nunjuncks express engine template
    const njk = expressNunjucks(app, {
        watch: isDev,
        noCache: isDev
    });
    // Check list Security
    app.use(lusca({
        csrf: false,
        xframe: 'DENY',
        p3p: 'ABCDEF',
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
        },
        xssProtection: true,
        nosniff: true
    }));
    app.disable('x-powered-by');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(express.static(path.join(__dirname, '../public')));
    // TODO generate API doc and module doc
    //app.use('/doc', auth, express.static(path.join(__dirname, '../api-doc')));
    //app.use('/modules-doc', auth, express.static(path.join(__dirname, '../modules-doc')));

    // Routing Systems
    require('../routes')(app);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use('/:url(api|auth)/*', function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err.stack
            });
        });
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use('/:url(api|auth)/*', function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};
