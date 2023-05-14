const dotenv = require("dotenv").config()
const mongoose = require("mongoose")


const db = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Sucesso"))
.catch(() => console.log("erro"))

module.exports = db 