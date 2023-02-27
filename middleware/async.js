//instead of using this function there is another module exist called express-async-errors
// and by using this express module it will be the same as this function bellow 
module.exports = function (handler){
    return async (req,res,next) => {
           try {
                await handler(req,res);
           } catch (ex) {
                  next(ex);
           }    
    }
}