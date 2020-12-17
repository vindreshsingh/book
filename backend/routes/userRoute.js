const express=require("express");
const router=express.Router();
const User =require("../models/User");

//user register
router.post("/register",async (req,res)=>{
    try{
        
        const {name,email,password}= req.body;
        const userExit=await User.findOne({email:email});
        if(userExit){
            throw new Error("user exit");
        }
        const user=await User.create({name,email,password});
        console.log(user);
        res.send(user);
         
    } catch (error){
      throw new Error("Error creating");
    }
})
router.post("/login",(req,res)=>{
    res.send("login");
   })
   //update
   router.put("/update",(req,res)=>{
       res.send("update");
      })
      // delete
      router.delete("/:id",(req,res)=>{
          res.send("delete");
      })

module.exports=router;