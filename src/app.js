const express=require('express');

const app=express();



 app.get("/user",(req,res)=> {
   console.log(req.query);
    res.send({firstName : "Devansh", lastName : "Rimza"});
 });

 app.post("/user",(req,res)=> {
   res.send("Data is successfully saved to Database");
});

app.delete("/user",(req,res)=> {
   res.send("Deleted successfully");
});

 
 
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});