
const express = require("express")

const app = express()

app.use(express.json())


const db = require("./config/mongoose")
app.set("Mongoose", db)


const routes = require("./routes/user.routes")
app.use(routes)

module.exports = app