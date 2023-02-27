const winston = require('winston');
const mongoose = require('mongoose');
const config=require('config');
module.exports = function (isProduction) {
    mongoose.set('useCreateIndex', true);
    if (isProduction)
        mongoose.connect(process.env.MONGODB_URI);
    else {
        //'mongodb://localhost/nodeMailer'
        mongoose.connect(`${config.get('configuration.mongodb.connection')}`, { useNewUrlParser: true,useUnifiedTopology: true })
            .then(() => winston.info(`Connected to Mongodb...`));
        mongoose.set('debug', true);
    }
}