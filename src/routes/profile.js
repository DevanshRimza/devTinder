const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validations");
const bcrypt = require("bcrypt");
const validator=require("validator");

 profileRouter.get("/profile/view",userAuth ,async (req, res)=>{
    try{
 
    const user= req.user;
 
    res.send(user);
 
    }catch(err) {
       res.status(400).send("ERROR : "+err.message);
    }
  })

 profileRouter.patch("/profile/edit",userAuth, async (req, res)=>{
    try{
      if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
      }

      const loggedInUser=req.user;



      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
      await loggedInUser.save();


      res.json({
         message : `${loggedInUser.firstName}, your profile updated successfully`,
         data : loggedInUser,
      });
    }catch(err) {
       res.status(400).send("ERROR : "+err.message);
    }
 })


 profileRouter.patch("/profile/password",userAuth, async (req,res)=>{

  try{
   const loggedInUser=req.user;
   console.log(loggedInUser.password);
   const newPassword = req.body.password;

   if(!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter a strong password");
   }


   const passwordHash = await bcrypt.hash(newPassword,10);

   loggedInUser.password=passwordHash;
   console.log(loggedInUser.password);

   await loggedInUser.save();

  }catch(err) {
   res.status(400).send("ERROR : "+err.message);
}

   



 })
 
module.exports=profileRouter;