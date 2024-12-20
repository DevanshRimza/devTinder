const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim : true,
        validate(value) {
         if(!validator.isEmail(value)){
            throw new Error("Invalid Email address : "+value);
         }
        },
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
               throw new Error("Enter a Strong Password : "+value);
            }
           },
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        enum : {
           values : ["male","female","other"],
           message : `{VALUE} is not a valid gender type`,
        },

        //validate(value) {
        //                throw new Error("Gender data is not valid");
        //  }
        //   },
     },
    photoUrl : {
        type : String,
        default : "https://t4.ftcdn.net/jpg/08/19/66/31/360_F_819663119_che4sZSrmQv8uQJOzuN9TVQFQNHJlfQ2.jpg",
        validate(value) {
            if(!validator.isURL(value)){
               throw new Error("Invalid Photo URL : "+value);
            }
           },
    },
    about : {
        type : String,
        default : "This is the default about of the user !",
    },
    skills : {
        type : [String],
    },
},{
    timestamps : true,
}); 

userSchema.methods.getJWT = async function() {
    const user = this;
    const token=await jwt.sign({_id : user._id},"DEV@Tinder$790",{expiresIn:"7d"});
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

module.exports=mongoose.model("User",userSchema);


