import mongoose from "mongoose";

const Customer=mongoose.model('Customer',new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
       
    },

    email:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
       type:String,
       required:true 
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    address:{
        addressId:{
            type:String,
            required:true
        },

        landmark:{
            type:String,
            // required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        pinCode:{
            type:Number,
            Required:true
        }
    }
}));


export default Customer;

