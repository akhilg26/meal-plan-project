const bcryptjs = require("bcryptjs") // hashing the password
const jwt = require("jsonwebtoken") // for creating a jsonwebtoken
const User = require("../models/User") // imports model

const register = async (req, res) => {
    try{
        const {username, email, password} = req.body
        const existingUsername = await User.findOne({username: username}) // accesses the database
        const existingEmail = await User.findOne({email: email})
        if (existingUsername){
            return res.status(400).json({message: "Username already exists"})
        } 
        if (existingEmail){
            return res.status(400).json({message: "Email already exists"})
        } 

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d'}) // HTTP is stateless, this token is the only way to store this info

        return res.status(201).json({token: token, id: user._id, username: username, email: email})
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}   

const login = async (req, res) => {
    try {
        const {username, password, email} = req.body
        const checkUser = await User.findOne({username: username})
        if (checkUser){
            const checkPassword = await bcryptjs.compare(password, checkUser.password)
            if (checkPassword){
                const token = jwt.sign({id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: '30d'})
                return res.status(200).json({token: token, id: checkUser._id, username: username, email: email})
            }
            else{
                return res.status(400).json({message: "Password is incorrect"})
            }
        }
        else{
            return res.status(400).json({message: "Username does not exist"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = { register, login}