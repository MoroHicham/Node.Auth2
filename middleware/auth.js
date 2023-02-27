const jwt=require('jsonwebtoken');
const config=require('config');

module.exports=function (req,res,next){
      const token=req.header('x-auth');
      if(!token) return res.send('Access denied , No token provided').status(401);
      try {
            const decoded=jwt.verify(token,config.get('configuration.jwtprivatekey.pkey'));
            req.PersonalAccount=decoded;
            next();
        } catch (error) {
             res.send('Invalid token').status(400);
      }
}