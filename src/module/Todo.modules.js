const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { status } = require("express/lib/response");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  discription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    require: true,
  },
});
todoSchema.pre("save",async function(next){
  this.password = await bcrypt.hash(this.password,10)
  next()
})
module.exports = mongoose.model("Todo", todoSchema);