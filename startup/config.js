const config=require('config');
module.exports = function () {
    //checking the json web token if exists
    if (!config.get('configuration.jwtprivatekey.pkey')) {
        console.error('FATAL ERROR : json web token is not defined');
        process.exit(1);
    }
}