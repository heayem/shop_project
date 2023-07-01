// const { request } = require('express')
const db = require('../db.configer/db.configer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


// req.file.orignal

const CreateUser = (req, res) => {

    let body = req.body
    let message = {}
    if (body.User_Name == null || body.User_Name == "") {
        message.User_Name = "Please fil in name"
    }
    if (body.Password == null || body.Password == "") {
        message.Password = "Please fil in password "
    }
    if (body.Email == null || body.Email == "") {
        message.Email = "please fil in Email"
    }
    if (body.Tel == null || body.Tel == "") {
        message.Tel = "please fil in Telephone number "
    }
    if (body.role == null || body.role == "") {
        message.role = "please fil in role "
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    var password = body.Password

    password = bcrypt.hashSync(password, 10)
    // $2b$10$crnCIVwYpjPs7IWETci1QO/f76BT5lFdoKTKV5ndDolnrChArvMe.
    db.query("SELECT * FROM user WHERE Email = ? OR Tel = ? ", [body.Email, body.Tel], (err1, row1) => {
        if (err1) {
            res.json({
                error: true,
                message: err1
            })
        } else {
            if (row1.length === 0) {
                let sql = "INSERT INTO `user`"
                sql += "(`User_Id`,`User_Name`,`Password`,`Tel`,`Email`,`Verify_Code`,`Status`,`Create_At`,`Time_LogIn`,`Time_LogOut`)"
                sql += " VALUES(?,?,?,?,?,?,?,?,?,?)"
                const paramet = [body.User_Id, body.User_Name, password, body.Tel, body.Email, body.Verify_Code, 1, new Date(), null, body.Time_LogOut]
                db.query(sql, paramet, (err, row) => {
                    if (err) {
                        res.json({
                            error: true,
                            message: err
                        })
                    }
                    else {
                        if (row.affectedRows > 0) {
                            db.query("SELECT * FROM user ORDER BY User_Id DESC ", (err2, row2) => {
                                if (err2) {
                                    res.json({
                                        error: true,
                                        message: err2
                                    })
                                } else {
                                    db.query("INSERT INTO `user_role` VALUES (?,?,?)", [null, row2[0].User_Id, body.role], (err3, row3) => {
                                        if (err3) {
                                            res.json({
                                                error: true,
                                                message: err3
                                            })
                                        } else {
                                            res.json({
                                                message: "Insert success!",
                                                RecordNum: row.length,
                                                data: row
                                            })
                                        }
                                    })
                                }
                            })



                        } else {
                            res.json({
                                error: true,
                                message: "Input no succes!",
                            })
                        }

                    }

                })
            } else {
                if (row1[0].Tel == body.Tel) {
                    res.json({
                        error: true,
                        message: "Your telephone number have already exist  ",
                    })
                    return false

                }
                if (row1[0].Email = body.Email) {
                    res.json({
                        error: true,
                        message: "Your Email have already exis",
                    })
                    return false
                }

            }
        }
    })


}

const getAll_User = (req, res) => {

    const page = req.query.page
    var end = 4
    var start = (page - 1) * end

    var sql = "SELECT User_Id,User_Name,Email,Tel,Status, "
    sql += " DATE_FORMAT(Create_At,'%d/%m/%Y %h:%i %p') AS Create_At, "
    sql += "  DATE_FORMAT(Time_LogIn,'%d/%m/%Y %h:%i %p') AS Time_LogIn  ,"
    sql += "  DATE_FORMAT(Time_LogOut,'%d/%m/%Y %h:%i %p') AS Time_LogOut "
    sql += " FROM user ORDER BY User_Id DESC LIMIT " + start + "," + end + " "
    db.query(sql, (err, row) => {
        db.query("SELECT COUNT(User_Id) AS total FROM user", (err1, row1) => {
            var total = row1[0].total
            if (err) {
                res.json({
                    message: err,
                    error: true

                })
            } else {
                if (row != 0) {
                    res.json({
                        RecordNum: total,
                        pageNum: Math.ceil(total / end),
                        list: row
                    })
                } else {
                    res.json({
                        message: "no user yet"
                    })
                }

            }

        })

    })
}
const getOne_User = (req, res) => {
    let id = req.params.id
    const sql = "SELECT * FROM user WHERE User_Id=?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row != 0) {
                res.json({
                    RecordNum: row.length,
                    list: row
                })



            } else {
                res.json({
                    message: "no user yet"
                })
            }

        }

    })
}

const Update_User = (req, res) => {
    let body = req.body
    let message = {}
    if (body.Status == "" || body.Status == null || body.Status == undefined) {
        message.Status = "Plz set status"
    }
    if (body.User_Id == "" || body.User_Id == null || body.User_Id == undefined) {
        message.User_Id = "Plz select user to update "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    const sql = "UPDATE `user` SET Status=? WHERE User_Id=?"
    db.query(sql, [body.Status, body.User_Id], (err, row) => {
        if (err) {
            res.json({
                message: err,
                error: true

            })
        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "You have Updated!",
                    RecordNum: row.length,
                    list: row

                })
            } else {
                res.json({
                    message: "Updated flase plz check again!",
                    list: row

                })
            }

        }
    })

}
const Update_User_Time = (req, res) => {
    let body = req.body
    let message = {}
    if (body.User_Id == "" || body.User_Id == null || body.User_Id == undefined) {
        message.User_Id = "Plz select user to update "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    const sql = "UPDATE `user` SET  Time_LogOut=? WHERE User_Id=?"
    db.query(sql, [new Date(), body.User_Id], (err, row) => {
        if (err) {
            res.json({
                message: err,
                error: true

            })
        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "You have Updated!",
                    RecordNum: row.length,
                    list: row

                })
            } else {
                res.json({
                    message: "Updated flase plz check again!",
                    list: row

                })
            }

        }
    })

}

const Delete_User = (req, res) => {

    let body = req.body
    let message = {}
    if (body.User_Id == "" || body.User_Id == null || body.User_Id == undefined) {
        message.User_Id = "Plz select user to delete "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    const sql1 = "SELECT Status FROM user WHERE User_Id=? "
    db.query(sql1, [body.User_Id], (err1, row1) => {
        if (err1) {
            res.json({
                message: err1,
                error: true

            })
        } else {
            if (row1.length > 0) {
                const sql = "DELETE FROM user WHERE User_Id=?"
                db.query(sql, [body.User_Id], (err, row) => {
                    if (err) {
                        res.json({
                            message: err,
                            error: true
                        })
                    } else {
                        if (row.affectedRows > 0) {
                            res.json({
                                message: `Deleted`,
                                list: row
                            })
                        } else {
                            res.json({
                                message: `ID not found`,
                            })
                        }

                    }
                })

            } else {
                res.json({
                    message: "User's status is active "
                })
            }

        }
    })

}

module.exports =
{
    CreateUser,
    getAll_User,
    getOne_User,
    Update_User,
    Delete_User,
    Update_User_Time
}