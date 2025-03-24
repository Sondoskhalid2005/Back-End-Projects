const jwt = require("jsonwebtoken");
const Users = require("../module/Users.modules");
const mongoose = require("mongoose");

const checkUser = async (req, res, next) => {
  console.log("here1");
const token = req.cookies.token
  try{
    console.log("here2");
    console.log("token ",token)
    if (!token)
    return res
      .status(401)
      .json({ 
         success: false,
         message: "Unauthorized => no token provided" 
           });
  let decoded = jwt.verify(token, "task 9");
  console.log("Decoded Token:", decoded);
           
  if (!decoded||!decoded.userId)
    return res
      .status(401)
      .json({ 
        success: false, 
        message: "Unauthorized => invalid token"
           });
         
           req.userId = decoded.userId;
          const userid= new mongoose.Types.ObjectId(decoded.userId);
           const user = await Users.findById(req.userId);
    
           if (!user) {
             return res.status(404).json({ status: 404, message: " // User not found" });
           }
        console.log("Extracted userId:", req.userId);
           next();
}catch(error){
    res.status(500).send({
      status: 500 ,
      msg:"server  2error"
    })
  }
};

module.exports = { checkUser } 