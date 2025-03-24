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
/*/const get_remain_todo=async (req,res)=>{
    try{
        console.log("0");
        let userid=req.userId;
        console.log("0");
        const convertedUserid= new mongoose.Types.ObjectId(userid);
        console.log("0");
        const user=await Users.findById(convertedUserid).populate("todos");
        console.log("1");
        if (!user){
            return res.status(404).send({
                status: 404 ,
                error: "user not found!",
               })
        } 
        console.log("10");
        
        let remainingTodos = [];
        console.log("100");
         remainingTodos = user.todos.filter(todo => !todo.status);
        console.log("200");
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
}/*/

const get_remain_todo=async (req,res)=>{
    try{
        console.log("100");
        
        let userid=req.userId
        const convertedUserid= new mongoose.Types.ObjectId(userid); 
        console.log("200");
        const user=await Users.findById(convertedUserid)
        console.log("300", convertedUserid , user);
        if (!user){
            return res.status(404).send({
                status: 404 ,
                error: "user not found!",
               })
        }
        console.log("400");
        //const remainingTodos = [];
        console.log("500");
         let remainingTodos = await Todo.find({ userId: convertedUserid , status : false });
         console.log(Todo);
         console.log(remainingTodos)
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