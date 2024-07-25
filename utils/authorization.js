var jwt = require('jsonwebtoken');


const apiKeyAuthorization = (req, res, next) =>{
    // try{
    const token = req.headers["authorization"]
    if (token == "zyxuv"){
        return next() //next - calls controller
    }
    return res.status(401).json({message: "unauthorized user"})
}




const generateToken = (data) => {
    console.log("Inside generateToken() | data : ",data);
    const token = jwt.sign(data, 'shhhhh');
    console.log("token", token);
    return token;
}

const jwtVerifyToken = (req,res,next) => {
    try{
        const token = req.headers["authorization"];
        console.log("jwtVerifyToken", token);
        if(!token) {
            return res.status(401).json({"message":"Unauthorized User"})
        }
        const decoded = jwt.verify(token, 'shhhhh');
        console.log("decoded", decoded);
        req.user = decoded;
        return next(); //in controller
    } 
    catch(err){
        console.log("Error : ",err);
        return res.status(401).json({"message":err.message})
    }
}

module.exports = {generateToken, jwtVerifyToken, apiKeyAuthorization};