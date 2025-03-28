const {Router} = require("express")
const router = Router()
const controller = require("../controller/Todo.Controller");
const { checkUser } = require("../middleware/Auth.middleware");

router.post("/add-todo",checkUser, controller.add_todo);
router.put("/change-status/:id", controller.change_status);
router.delete("/delete-todo/:id", controller.delete_todo); 
router.get("/getTodoById/:id", controller.getTodoById);
module.exports = router ;