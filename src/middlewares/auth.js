function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
       return res.status(400).send({
            message: "Acess recused"
        })
    }

    try {
        const secret = process.env.SECRET 

        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({
            msg: "Invalid"
        })
    }   
}

module.exports = checkToken 