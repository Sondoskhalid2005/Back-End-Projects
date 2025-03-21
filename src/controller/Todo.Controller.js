const Users= require("../module/Users.modules");
const Todo=require("../module/Todo.modules")

// add-todo method
const add_todo= async(req,res)=>{
    const {title , discription , status}=req.body;
    
        const userId=req.userId;
    console.log(userId)
    try{
        const user=await Users.findById(userId); 
        if(!user){ 
            return res.status(404).send({
                status: 404,
                msg: "User not found",
              });
        }
            const newTodo= new Todo({title , discription , status, userId});
            user.todos.push(newTodo._id);
            await newTodo.save();
            await user.save();
        
            return res.status(201).send({
           "success": true,
            message: "Todo added successfully",
            todo: newTodo,
          });
    }catch(error){
        res.status(500).send({
            status: 500 ,
            error: "server error",
             
           })
    }
}
// change_status method
const change_status= async(req,res)=>{
try{
    const todoid=parseInt(req.params.todoid);
    const {status}=req.body;
    const userid=req.userId
    const user= await Users.findById(userid);
    const todo= await Todo.findById(todoid)
if(!user){
    return res.status(404).send({
        status: 404 ,
        error: "user not found",
         
       })
}
if (!todo){
    return res.status(404).send({
        status: 404 ,
        error: "todo not found to edit its status !",
       })
}
if(todo.user!=userid){
    return res.status(401).send({
        status: 401 ,
        error: "unouthorized access !",
       })
}

todo.status=status;
await todo.save();
return res.status(201).send({
    "success": true,
    "message": "Todo status updated successfully"
  });

}catch(error){
    res.status(500).send({
        status: 500 ,
        error: "server error",   
       })
}
}
// change_status method
const delete_todo=async(req,res)=>{
    try{
        const todoid=parseInt(req.params.todoid)
        const userid=req.userId
        const todo=await Todo.findById(todoid)
        if (!todo){
            return res.status(404).send({
                status: 404 ,
                error: "todo not found to delete it!",
               })
        }
        if(todo.user!=userid){
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
        const todoid=parseInt(req.params.todoid)
        const userid =req.userId
        const todo= await Todo.findById(todoid)
        if (!todo){
            return res.status(404).send({
                status: 404 ,
                error: "todo not found!",
               })
        }
        if(todo.user!=userid){
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
            error: "server error",   
           });
    }
}
module.exports={add_todo,change_status, delete_todo ,getTodoById}