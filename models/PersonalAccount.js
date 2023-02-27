const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

const accountSchema = new mongoose.Schema({

    name: { type: String,required: [false, "can't be blank"], maxlength: 15, min: 5 },
    email:
    {
        type: String, required: [true, "can't be blank"], max: 50, min: 5,
        validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        }
    },
    password: { type: String, required: [true, "can't be blank"], min: 5 },
    accountStatut : { type: String,required:false,default:true, maxlength: 15, min: 5 },

});

accountSchema.methods.generateAuthToken= function() {
    const token=jwt.sign({_id:this._id},config.get('configuration.jwtprivatekey.pkey'));
    return token;
}

accountSchema.plugin(uniqueValidator, { personalAccount: 'Error, expected {PATH} to be unique.' });
mongoose.model('PersonalAccount', accountSchema);