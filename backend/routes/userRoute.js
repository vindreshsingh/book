const express=require("express");
const router=express.Router();
const asyncHandler=require("express-async-handler");
const generateToken=require("../utils/generateToken");
const authMiddleware=require("../middlewares/authMiddleware");
const User =require("../models/User");

//user register
router.post("/register",asyncHandler(async (req,res)=>{
    try{
        
        const {name,email,password}= req.body;
        const userExit=await User.findOne({email:email});
        if(userExit){
            console.log("error here")
            throw new Error("user exit");
        }
        const userCreated=await User.create({name,email,password});
        res.json({
            _id: userCreated._id,
            name: userCreated.name,
            password: userCreated.password,
            email: userCreated.password,
            token: generateToken(userCreated._id),
          });
         
    } catch (error){
  //  res.send(error);
    }
})
)
router.post("/login",asyncHandler(async (req,res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user && (await user.isPasswordMatch(password))){
        res.status(200);

      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.password,
        token: generateToken(user._id),
      });
    }
    else{
        res.status(401);
        throw new Error('Invalid credentials');
    }

   })
)
  //update user
router.put(
    '/update',
    authMiddleware,
    asyncHandler(async (req, res) => {
      //Find the login user by ID
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password || user.password;
        }
  
        const updatedUser = await user.save();
  
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id),
        });
      }
    })
  );
  
  
  //fetch Users
  router.get(
    '/',
    authMiddleware,
    asyncHandler(async (req, res) => {
      const users = await User.find({});
  
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(500);
  
        throw new Error('No users found at the moment');
      }
    })
  );
  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(user);
      } catch (error) {
        res.json(error);
      }
    })
  );

module.exports=router;