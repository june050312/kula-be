const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET

const loginUser = async(req, res) => {
    try {
        const user = req.body

        const user_data = await User.findOne({ user_id: user.id });
        if (!user_data) {
            return res.status(401).send("wrong user id")
        }

        const password_check = await bcrypt.compare(user.password, user_data.password);
        if (!password_check) {
            return res.status(401).send("wrong password")
        }

        const token = jwt.sign({ user_id: user_data.user_id }, jwt_secret);
        res.cookie("token", token);

        res.status(200).send("login success")
    } catch (error) {
        console.error(error)
    }
}

const createUser = async(req, res) => {
    try {
        const user = req.body
        console.log(user)
        
        if (user.password === user.passwordConfirm) {
            const user_data = await User.findOne({ user_id: user.id });
            if (user_data) {
                return res.status(401).send("id already exists")
            }

            const hashed_password = await bcrypt.hash(user.password, 10)
            await User.create({
                user_id: user.id,
                password: hashed_password,
                name: user.name,
                school_id: user.schoolId
            });

            res.status(200).send("register success")
        } else {
            res.status(400).send("password is not accord")
        }
    } catch (error) {
        console.error(error)
    }
}

const logoutUser = async(req, res) => {
    try {
        res.clearCookie("token").send("successfully delete cookie")
    } catch (error) {
        console.log(error)
    }
}

const isLogin = async(req, res) => {
    try {
        const token = req.cookies.token
        if (token) {
            const decoded_token = jwt.verify(token, jwt_secret)
            res.status(200).send(decoded_token.user_id)
        } else {
            res.status(401).send("invalid cookie")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    loginUser,
    createUser,
    isLogin,
    logoutUser
}