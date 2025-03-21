const jwt = require("jsonwebtoken");
const Users = require("../module/Users.modules");

const checkUser = async (req, res, next) => {
  if (req.path.startsWith("/auth")) return next();
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  const decoded = jwt.verify(token, "task 9");
  if (!decoded)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });

  req.userId = decoded.id;
  // Check if the user exists
  const user = await Users.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  req.user = user; // Attach the user to the request
  next();
};

module.exports = { checkUser } 