const express = require("express");
const authRouter = express.Router();

const {validateSignUpData} = require("../utils/validations");
const User=require("../models/user");
const bcrypt = require("bcrypt");


 authRouter.post("/signup",async (req, res)=>{
   
    try {
       // validation of password
     validateSignUpData(req);
 
     const {firstName, lastName, emailId, password} = req.body;
 
     // Encrypt the password
     const passwordHash = await bcrypt.hash(password,10);
     console.log(passwordHash);
 
     // Creating a new instance of user model
      const user = new User({
       firstName,
       lastName,
       emailId,
       password : passwordHash,
      });
      
       //await user.save();
       //res.send("User added successfully..!");

       const savedUser = await user.save();
       const token = await savedUser.getJWT();

       res.cookie("token", token, {
         expires: new Date(Date.now() + 8 * 3600000),
       });

      res.json({ message: "User Added successfully!", data: savedUser });
    }catch(err) {
       res.status(400).send("ERROR : "+err.message);
    }
    
 
  })


 authRouter.post("/login", async (req, res)=>{
    try{
 
       const {emailId, password} = req.body;
 
       const user= await User.findOne({emailId : emailId});
       if(!user){
          throw new Error("Invalid credentials");
       }
 
       const isPasswordValid = await user.validatePassword(password);
 
       if(isPasswordValid){
 
        // Create the JWT Token
 
         const token=await user.getJWT();
         console.log("token-----------------------------------------------------------",token);
 
        // Add the token to cookie and send the respose to the user
 
        
        res.cookie("token", token, {
         httpOnly: true,
         secure: false, // Use this only in production with HTTPS
         sameSite: "Lax", // Adjust SameSite policy if needed
         expires: new Date(Date.now() + 8 * 3600000),
       });
         /*res.cookie("token",token,{
          expires : new Date(Date.now() + 8*3600000),
         });
 */
      console.log("cookie--------------------------------------------------",res.cookie);
          //res.send("Login successful !!!")
          res.send(user);
       }else {
          throw new Error("Invalid credentials");
       }
 
    }catch(err) {
       res.status(400).send("ERROR : "+err.message);
    }
  })

 authRouter.post("/logout",async (req, res)=>{
    res.cookie("token",null,{
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!!");
  });

module.exports = authRouter;