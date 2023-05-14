const routes = require("express").Router()
const controller = require("../controller/User.controller")
const auth = require("../middlewares/auth")
routes.get("/", (req, res) => {
   res.status(200).send({
     message: "Api Sucessfully"
   })
})
routes.post("/register", controller.registerController )
routes.post("/login", controller.loginController )
routes.get("/user/:id", auth, controller.privateRoute)

module.exports = routes 