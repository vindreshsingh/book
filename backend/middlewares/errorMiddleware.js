const errorMiddlewareHandler=(err,req,res,next)=>{
    const errorStatusCode=res.statusCode===200 ? 500:res.statusCode;
    res.status(errorStatusCode);
    res.json({
        message:err.message,
    });
};
module.exports={errorMiddlewareHandler};