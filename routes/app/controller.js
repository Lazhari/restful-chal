'use strict';

module.exports = {
    getHomePage(req, res) {
        return res.render('index.html', {
            title: 'Fashion Cloud Challenge API v1'
        });
    }
};
