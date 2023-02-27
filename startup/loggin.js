const winston = require('winston');
const config=require('config');
require('winston-mongodb');
module.exports = function () {
    //when we have unhandled Promise Rejection instead of this code bellow we can simply throw the exception
    //and here we have unhandled Exception so winston automatically catch this exception and log it in this file
    //and determinate the process.
    winston.add(new winston.transports.File({
        filename: 'uncaughtExceptions.log',
        handleExceptions: true,
        level:'info'
    }));
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({
        db: config.get('configuration.mongodb.connection'),
        level: 'info'
    }));
}



/**
   * Requiring `winston-mongodb` will expose
   * `winston.transports.MongoDB`
   * https://github.com/winstonjs/winston-mongodb
   */