const auth=require('../../middleware/auth');
const router = require('express').Router();
const mongoose = require('mongoose');
const Account = mongoose.model('PersonalAccount');
const Customer = mongoose.model('Customer');
const joi = require('joi');
const asyncMiddleWare=require('../../middleware/async');
const _ =require('lodash');
const bycrypt=require('bcrypt');


//POST endPoint
router.post('/yanstore/api/register',asyncMiddleWare(async (req, res) => {

      console.log('processing....');
      console.log(req.body);

      const { error } = validate(req.body);

      if (error) return res.send(error).Status(404);
      
      // Find the user given by req.body 
      let account = Account.findOne({ email: _.pick(req.body,['email']) });
      let phoneNumber=Customer.findOne({ customerPhoneNumber: _.pick(req.body,['customerPhoneNumber']) });
      // check if the user already exists
      if (!account) return res.send('user is already exists!').Status(404);
      // Check the user is phone number already exists 
      if (!phoneNumber) return res.send('phone number is already exists!').Status(404);

      // Create new account and user instances
      let _account =new Account(_.pick(req.body,['name','email','password']));
      let _customer=new Customer(_.pick(req.body,[
                                          'customerFirstName',
                                          'customerLastName',
                                          'customerGender',
                                          'customerPhoneNumber',
                                          'customerBirthday',
                                          'createDate',
                                          'customerStaut'
                                    ]));
   

      // Generate salt for hashing
      let salt=await bycrypt.genSalt(10);
      _account.password=await bycrypt.hash(_account.password,salt);

      // Save the user Account 
      await _account.save();
    
      // Generate the user's token
      const token=_account.generateAuthToken();
      return res.header('x-auth',token).send(_.pick(_account,['_id','name'])).status(200);

}));


// get the current user 
router.get('/api/users/me',auth,asyncMiddleWare(async(req,res)=>{
      const user=await Account.findById(req.user._id).select('-password');  
      res.send(user).status(200);
}));


//
function validate(req) {
      const schema = {
         name:joi.string().min(5).max(15).required(),
         email: joi.string().min(5).max(50).required().email(),
         password: joi.string().min(5).max(25).required()
      }
      return joi.validate(req, schema);
   }
module.exports = router;