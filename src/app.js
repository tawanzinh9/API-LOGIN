
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const db = require("./config/mongoose")
app.set("Mongoose", db)


const routes = require("./routes/user.routes")
app.use(routes)

module.exports = app