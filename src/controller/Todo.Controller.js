const users= require("../module/Users.modules");
const Todo=require("../module/Todo.modules")
const mongoose = require("mongoose");

// add-todo method
const add_todo= async(req,res)=>{
    try{
        let bodyy=req.body;
        bodyy.userId=req.userId ;
        let userid=req.userId;
        const newTodo = await Todo.create(bodyy);
        console.log("user id extracted",typeof(userid))
    
       // const userid= new mongoose.Types.ObjectId(userid);
        const user=await users.findById(userid); 
        await users.findByIdAndUpdate(newTodo.userId,  { $push: { todos: newTodo._id} },)

        if(!user){ 
            return res.status(404).send({
                status: 404,
                msg: "user not found",
              });
        }
         console.log("befor saving" , userid);
           
         
          //const newTodo = new Todo({title  , description , status, userId:userid});
            console.log("1", newTodo._id)
            //user.todos.push(newTodo._id);
             console.log("before saving user")
            // await Todo.findByIdAndUpdate(user._id ,  { $push: { newTodo} },)
             console.log("before saving newtodo")
            return res.status(201).send({
           "success": true,
            message: "Todo added successfully",
            todo: newTodo,
          });
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error "+ error.message 
             
           })
    }
}
// change_status method
const change_status = async(req,res) => {
    try{
        let id = req.params.id;
        console.log("hi1", id, req.params.id);
        
        const {status} = req.body;
        console.log("hi2", status);
        
        let userid = req.userId
        userid = new mongoose.Types.ObjectId(userid);
        console.log("hi3", userid ); //same
        
        const user = await users.findById(userid);
        console.log("hi4", user);
        let todoId = new mongoose.Types.ObjectId(id);
        const todo = await Todo.findById(todoId)
        console.log("hi5", todo.userId); 
        
        if(!user){
            return res.status(404).send({
                status: 404,
                error: "user not found",
            })
        }
        
        if (!todo){
            return res.status(404).send({
                status: 404,
                error: "todo not found to edit its status !",
            })
        }
        console.log("heree");
        
        if(todo.userId.toString()!== userid.toString()){
            return res.status(401).send({
                status: 401,
                error: "unouthorized access xxcxx!",
            })
        }
        console.log("heree 1");
        
        await Todo.findByIdAndUpdate(id, { status: status });
        console.log("heree2");
        
        return res.status(201).send({
            "success": true,
            "message": "Todo status updated successfully"
        });
    
    }catch(error){
        res.status(500).send({
            status: 500,
            error: "server error: " + error.message,
        })
    }
    }
// change_status method
const delete_todo=async(req,res)=>{
    try{
        let id=req.params.id;
        const userid=req.userId
        const todoId= new mongoose.Types.ObjectId(id)
        const todo=await Todo.findById(todoId)

        if (!todo){
            return res.status(404).send({
                status: 404 ,
                error: "todo not found to delete it!",
               })
        }
        if(todo.userId.toString() !== userid.toString()){
            return res.status(401).send({
                status: 401 ,
                error: "unouthorized access !",
               })
        }
        
        await todo.deleteOne();
        res.status(200).send({
           "success": true,
           "message": "Todo deleted successfully"
          });
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error",   
           });
    }
}
// getTodoById method
const getTodoById=async(req,res)=>{
    try{
        let id=req.params.id
        const userid =req.userId
        const todoId = new mongoose.Types.ObjectId(id);
        const todo= await Todo.findById(todoId)
        if (!todo){
            return res.status(404).send({
                status: 404 ,
                error: "todo not found!",
               })
        }
        if(todo.userId.toString() !== userid.toString()){
            return res.status(401).send({
                status: 401 ,
                error: "unouthorized access!",
               })
        }
        res.status(200).send({
            "success": true,
            "todo":todo
        })
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error controler todo",   
           });
    }
}
module.exports={add_todo,change_status, delete_todo ,getTodoById}