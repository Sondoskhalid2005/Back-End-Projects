const Users= require("../module/Users.modules");
const Todo= require("../module/Todo.modules");
const mongoose = require("mongoose");

// get_todos method 
 const get_todos=async (req,res)=>{
   
    try{
        let userid=req.userId
        const user=await Users.findById(userid)
        const convertedUserid= new mongoose.Types.ObjectId(userid);
        if (!user){
            return res.status(404).send({
                status: 404 ,
                error: "user not found!",
               })
        }
        /*/let list= Todo.findById (todo=>todo.userId.equals(convertedUserid));
           console.log(list);/*/
           user.todos.forEach(todo => {
                 list.push(todo)
        })
        res.status(200).send({
             "success": true,
             "todos": list })
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error",   
           });  
    }
 }
//get-remain-todo method
const get_remain_todo=async (req,res)=>{
    try{
        const userid=req.userId
        const user=await Users.findById(userid)
        if (!user){
            return res.status(404).send({
                status: 404 ,
                error: "user not found!",
               })
        }
        const remainingTodos = [];
        user.todos.forEach(todo => {
            if(todo.status==false){
                 remainingTodos.push(todo)
            }
        })
        return res.status(200).send({
            "success": true,
            "remainingTodos":remainingTodos
           })   
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error",   
           }); 
    }
}
 module.exports={get_todos,get_remain_todo}