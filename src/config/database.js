const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://Devansh:G4kp5LKD1B8NTEu9@namastenode.0kdx3.mongodb.net/devTinder");
}


module.exports=connectDB;
