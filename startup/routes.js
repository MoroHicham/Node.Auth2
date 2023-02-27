const cors = require('cors');
const express = require('express');
module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    //normal express config default
    app.use(require('morgan')('dev'));
    require('../models/PersonalAccount');
    require('../models/customer');
    app.use(require('../routes/index'));
    app.use(require('../middleware/errors'));
}