const User = require("../model/User")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
async function registerController(req, res) {
    const { username, email, password } = req.body
  
    try {
      // Verifica se o email já existe
      const userWithEmail = await User.findOne({ email })
      if (userWithEmail) {
        return res.status(400).json({
          message: "Email already exists."
        })
      }
  
      // Verifica se o nome de usuário já existe
      const userWithUsername = await User.findOne({ username })
      if (userWithUsername) {
        return res.status(400).json({
          message: "Username already exists."
        })
      }
  
      // Valida se todos os campos estão preenchidos 
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Check all fields"
        })
      }
      

      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });
      await newUser.save();
      // Aqui você pode prosseguir com a criação do usuário
      // ...
      
      return res.status(200).json({
        message: "User created successfully",
      }) 
    } catch(err) {
      return res.status(400).json({
        message: "Error: " + err 
      })
    }
  }
  
async function loginController (req, res) {
    const {username, password}  = req.body 

    const usernameExists = await User.findOne({username})

    if(!usernameExists) {
      return res.status(400).send("User not exists")
    }

    const isPassword = await bcrypt.compare(password, usernameExists.password)

    if(!isPassword) {
      return res.status(400).send("Password isn't valid")
    }

    try {
      const secret = process.env.SECRET 

      const token = jwt.sign({id: usernameExists._id}, secret)

      res.status(200).send({
        message: "Autenticação realizada com sucesso" + token
      })
    } catch(err) {
      res.status(400).json({
        message: "Erro!"
      })
    }
}


// Rota privada

async function privateRoute (req, res) {
  const id = req.params.id 

  const user = await User.findById(id)

  if(!user) {
    return res.status(400).json({
      message: "User not found"
    })
  }

  res.status(200).json( {user} )
}
  module.exports = {
    registerController, loginController, privateRoute
  }