const winston=require('winston');
const express = require('express');
//Environment
var isProduction=process.env.NODE_ENV === 'development';

//create global app object 
const app=express();
require('./startup/loggin')();
require('./startup/config')();
//Startup setting
require('./startup/routes')(app);
// DataBase Configuration 
require('./startup/db')(isProduction);

/// catch 404 and forward to error handler
 app.use(function(err,req, res, next) {
    winston.error(err.message,err);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {}
    }});
  });
  
// finally, let's start our server...
var PORT=process.env.PORT | 3000;
app.listen(PORT, ()=> {
    winston.info('Listening on port ' + PORT);
});