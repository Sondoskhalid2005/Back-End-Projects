const Users= require("../module/Users.modules");

// get_todos method 
 const get_todos=async (req,res)=>{
    try{
        const userid=req.userId
        const user=await Users.findById(userid) 
        //.populate("todos", "title description status")
        //.select("todos");
        if (!user){
            return res.status(404).send({
                status: 404 ,
                error: "user not found!",
               })
        }
        res.status(200).send({
             "success": true,
             "todos":  user.todos
           }); 
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
        return res.status(404).send({
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