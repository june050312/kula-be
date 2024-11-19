const express = require('express')
const router = express.Router()
const {
    loginUser,
    createUser,
    isLogin,
    logoutUser,
} = require("../controllers/userController")

router.get("/login", isLogin)
router.post("/login", loginUser)
router.post("/register", createUser)
router.get("/logout", logoutUser)

module.exports = router