const express=require("express");
const app=express();
//mongoose
const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost/book_keep', { useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true,
useNewUrlParser:true }).then(() => 
console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));

//passing data
app.use(express.json());
//routes
//register
app.post("/api/users/register",async (req,res)=>{
    try{
        console.log(req.body)
    } catch (error){

    }
})
// login
 app.post("/api/users/login",(req,res)=>{
 res.send("login");
})
//update
app.put("/api/users/update",(req,res)=>{
    res.send("update");
   })
   // delete
   app.delete("/api/users/:id",(req,res)=>{
       res.send("delete");
   })
//server
const PORT=process.env.PORT || 5050;

app.listen(PORT,console.log(`Server start on port ${PORT}`));