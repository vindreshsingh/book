const express=require("express");
const app=express();
//models
const User=require("../backend/models/User")
//env
const dotenv=require("dotenv");
//error handler
const error=require("./middlewares/errorMiddleware")
//router
const router=require("../backend/routes/userRoute")
//mongoose
const mongoose=require("mongoose");
dotenv.config();
mongoose.connect(`mongodb://localhost/${process.env.MONGODB_NAME}`, { useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true,
useNewUrlParser:true }).then(() => 
console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));


//passing data
app.use(express.json());
//routes
//register
app.use("/api/users",router);
//error middleware
app.use(error.errorMiddlewareHandler)

//server
const PORT=process.env.PORT || 5050;
console.log(process.env.MONGODB_NAME);
app.listen(PORT,console.log(`Server start on port ${PORT}`));