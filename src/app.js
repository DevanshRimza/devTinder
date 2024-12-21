const express=require('express');
const connectDB=require("./config/database");
const app=express();
//const user = require('./models/user');
const cookieParser = require('cookie-parser');
//const jwt = require("jsonwebtoken");

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

 app.use(express.json());
 app.use(cookieParser());
 //app.options("*", cors()); // Handle preflight requests for all routes

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
   console.log("Database Connection Established");
   app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
  });
}).catch((err)=>{
   console.log("Database cannot be connected");
})

 
