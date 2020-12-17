const express = require('express');
const expressAsyncHandler = require('express-async-handler');
//const authMiddleware = require('../middlewares/authMiddleware');
const Book = require('../models/Book');

const bookRouter = express.Router();
 // create a book
 bookRouter.post('/',expressAsyncHandler(async(req,res)=>{
     const book=await Book.create(req.body);
     if(book){
         res.status(200);
         res.json(book);
     }
     else{
         res.status(500);
         throw new Error("book creating failed");
     }
 }))
 module.exports=bookRouter;