const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const customerSchema = new mongoose.Schema({
    
    customerFirstName: { type: String,required: [true, "the first name can't be blank"], maxlength: 15, min: 5 },
    customerLastName: { type: String,required: [true, "the last name can't be blank"], maxlength: 15, min: 5 },
    customerGender: { type: String,required: [true, "the customer gender can't be blank"], maxlength: 10, min: 5 },
    customerPhoneNumber: { type: String,required: [true, "customer phone can't be blank"], unique:true , maxlength: 25, min: 12 },
    customerBirthday: { type: Date,required: [true, "customer birthday can't be blank"]},
    createDate: { type: Date,required: [true, "can't be blank"], default:Date.now },
    customerStaut: { type: Boolean,required: [true, "can't be blank"],default:true},
    customerAccount : { type:mongoose.Schema.Types.ObjectId, ref: 'PersonalAccount',required:[true,"can't be blank"],unique:true}

});

customerSchema.plugin(uniqueValidator, { customer: 'Error, expected {PATH} to be unique.' });
mongoose.model('Customer', customerSchema);