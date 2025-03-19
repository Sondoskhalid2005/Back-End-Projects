const {Router} = require("express")
const router = Router()
const controller = require("../controller/User.Controller");

router.get("/get_todos", controller.get_todos);
router.get("/get_remain_todo", controller.get_remain_todo);


module.exports = router ;