const jwt = require("jsonwebtoken");
const Users = require("../module/Users.modules");

const checkUser = async (req, res, next) => {
  
const token = req.cookies.token
  try{
    console.log(token)
    if (!token)
    return res
      .status(401)
      .json({ 
         success: false,
         message: "Unauthorized => no token provided" 
           });
  let decoded = jwt.verify(token, "task 9");
  req.userId = decoded.userId;
           
  if (!decoded)
    return res
      .status(401)
      .json({ 
        success: false, 
        message: "Unauthorized => invalid token"
           });
           const user = await Users.findById(decoded.userId || decoded.id || decoded._id);
            
           if (!user) {
             return res.status(404).json({ status: 404, message: "User not found" });
           }
           
           
           next();
}catch(error){
    res.status(500).send({
      status: failed ,
      msg:"server error"
    })
  }
};

module.exports = { checkUser } 