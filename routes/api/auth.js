const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('Customer');
const joi = require('joi');
const _ =require('lodash');
const bycrypt=require('bcrypt');
//POST endPoint
router.post('/api/auth', async (req, res) => {
   try {
      console.log('Authentification....');

      const { error } = validate(req.body);

      if (error) return res.sendStatus(404);

      let _user =User.findOne({ email:`${ req.body.email }`});
      
      if (!_user) return res.sendStatus(404);
      
      let userQuery =await User.find({ email:req.body.email}).select({password:1,_id:1});

      let validPassword= await bycrypt.compare(`${req.body.password}`,userQuery[0].password);
    
      if(!validPassword) return res.sendStatus(404);

      const token=userQuery.generateAuthToken();

      return res.send(token).status(200);
      
   } catch (error) {
      console.log(error);
      return res.sendStatus(404);
   }
});
//
function validate(req) {
   const schema = {
      customerFirstName:joi.string().min(5).max(15).required(),
      customerLastName:joi.string().min(5).max(15).required(),
      customerGender:joi.string().min(5).max(10).required(),
      customerPhoneNumber:joi.string().min(12).max(25).required(),
      customerBirthday:joi.string().min(5).max(50).required(),
      createDate:joi.string().min(5).max(50).required(),
      customerStaut:joi.string().min(5).max(50).required(),
      email: joi.string().min(5).max(50).required().email(),
      password: joi.string().min(5).max(25).required()
   }
   return joi.validate(req, schema);
}
module.exports = router;