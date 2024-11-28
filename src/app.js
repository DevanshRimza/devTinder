const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const user = require('./models/user');

 app.post("/signup",async (req, res)=>{

   const user = new User({
      firstName : "Virat",
      lastName : "Kohli",
      emailId : "virat@kohli.com",
      password : "virat@123",
   });

   
   try {
      await user.save();
      res.send("User added successfully..!");
   }catch {
      res.status(400).send("Error saving the user : "+err.message);
   }
   

 })

 
 
connectDB().then(()=>{
   console.log("Database Connection Established");
   app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
  });
}).catch((err)=>{
   console.log("Database cannot be connected");
})

 
