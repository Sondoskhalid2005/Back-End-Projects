const jwt = require("jsonwebtoken");
const Users = require("../module/Users.modules");

const checkUser = async (req, res, next) => {
  //const token = req.cookies.token 
const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ 
         success: false,
         message: "Unauthorized => no token provided" 
           });
  let decoded = jwt.verify(token, "task 9");

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
           req.userId = user._id;
           req.user = user; 
  next();
};

module.exports = { checkUser } 