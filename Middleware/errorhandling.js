function errorHandler(err,req,res,next){
    console.log(err.stack);
    res.status(500).json({error:'something went!'});
}

const authenticate=(req,res,nest)=>{
    const token=req.headers[`authorization`];

    if(!token || token !== `Bearer ${API_KEY}`){
        return res.status(401).json({error:"Unauthorized- Invalid or missing token"})
    }
    next(); // User is authenticated
}

module.exports= {errorHandler, authenticate}