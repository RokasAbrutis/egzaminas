const express = require('express');
const router = express.Router();

const controller = require("../controllers/userController")


router.post("/register", controller.register)
router.post("/login", controller.login)
router.post("/current_user", controller.current_user)
// router.post("/profile/edit", controller.edit)
// router.post("/user", controller.currentUser)



module.exports = router;