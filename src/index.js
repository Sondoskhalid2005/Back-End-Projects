const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/ConnectDB.js");

const userRouter = require("./routers/Users.Routers.js"); // ✅ Correct import
const todoRouter = require("./routers/Todo.Router.js"); // ✅ Correct import
const authRouter = require("./routers/Auth.Router.js");

const { checkUser } = require("./middleware/Auth.middleware.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
/*/app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});/*/
app.use("/auth", authRouter);
app.use("*", checkUser);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});

//module.exports = {};
