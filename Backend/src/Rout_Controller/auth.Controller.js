const db = require('../db.configer/db.configer')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
// const genarateToken = (Object) => {
//     return jwt.sign({ Object }, process.env.Token)
// }
const getListProduct = (req, res) => {

    var authHeader = req.headers["authorization"]
    if (authHeader) {
        authHeader = authHeader.split(" ");
        var token = authHeader[1]

        if (token == null) {
            return res.sendStatus(401)
        } else {
            jwt.verify(token, process.env.ACCES_TOKEN, (err, user) => {
                if (err) {
                    res.json({ message: "Unauthorization" })
                } else {
                    var sql = "SELECT product.*,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN user ON product.User_Id=user.User_Id  WHERE product.User_Id =?"
                    var User_Id = user.user.User_Id
                    db.query(sql, [User_Id], (err1, row) => {
                        if (err1) {
                            res.json({
                                error: true,
                                message: err1
                            })
                        } else {
                            res.json({
                                data: row
                            })
                        }
                    })

                }


            })
        }


    }
}


const login = (req, res) => {
    var body = req.body
    var password = body.Password
    if (body.email === "" || body.email === undefined) {
        res.json({
            error: true,
            message: "please fil in user name "
        })
        return
    } else if (password === "" || password === undefined) {
        res.json({
            error: true,
            message: "please fil in password"
        })
        return
    }
    db.query('SELECT * FROM user WHERE Email =?', [body.email], (err, result) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {

            if (result.length == 0) {
                res.json({
                    error: true,
                    message: 'User exist. please register'
                })

            } else {
                var data = result[0]
                var dataPassword = data.Password
                if (bcrypt.compareSync(password, dataPassword)) {
                    delete result[0].Password
                    const user = result[0]
                    const acc_token = jwt.sign({ user: user }, process.env.ACCES_TOKEN)
                    // const acc_token = jwt.sign({ user: user }, config.config.ACCES_TOKEN)
                    db.query("UPDATE `user` SET Time_LogIn=? WHERE User_Id=?", [new Date(), result[0].User_Id], (err2, row2) => {
                        if (err2) {
                            res.json({
                                error: true,
                                message: 'update time login false '
                            })
                        } else {
                            db.query("SELECT ul.* FROM user as u INNER JOIN user_role as ul ON u.User_Id = ul.User_Id WHERE u.User_Id=? ", [result[0].User_Id], (err3, row3) => {
                                if (err3) {
                                    res.json({
                                        error: true,
                                        message: err3
                                    })
                                } else {
                                    res.json({
                                        user: user,
                                        role: row3,
                                        message: 'Logged in successfully',
                                        acc_token: acc_token

                                    })
                                }
                            })

                        }

                    })

                } else {
                    res.json({
                        error: true,
                        message: 'incorrect password'
                    })
                }
            }

        }

    })


}

module.exports = { login, getListProduct }