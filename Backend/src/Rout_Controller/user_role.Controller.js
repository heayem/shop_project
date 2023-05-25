const db = require('../db.configer/db.configer')

const setPermission = (req, res) => {
    var Role_Id = req.body.Role_Id
    var User_Id = req.body.User_Id
    if (Role_Id === "" || Role_Id === undefined) {
        res.json({
            error: true,
            message: "Please fil in Role_Id  "
        })
        return
    }
    if (User_Id === "" || User_Id === undefined) {
        res.json({
            error: true,
            message: "Please fil in User_Id  "
        })
        return
    }
    db.query("SELECT User_Id FROM user WHERE User_Id = ?", [User_Id], (err1, row1) => {
        if (err1) {
            res.json({
                error: true,
                message: err1
            })
        } else {
            if (row1.length > 0) {
                db.query("SELECT Role_ID FROM role WHERE Role_ID = ?", [Role_Id], (err2, row2) => {
                    if (err2) {
                        res.json({
                            error: true,
                            message: err1
                        })
                    } else {
                        if (row2.length > 0) {
                            db.query("SELECT * FROM user_role WHERE User_Id = ? AND Role_Id =?", [User_Id, Role_Id], (err3, row3) => {
                                if (err3) {
                                    res.json({
                                        error: true,
                                        message: err3
                                    })
                                } else {
                                    if (row3.length === 0) {
                                        const sql = "INSERT INTO user_role value(?,?,?)"
                                        const paramet = [null, User_Id, Role_Id]
                                        db.query(sql, paramet, (err, row) => {
                                            if (err) {
                                                res.json({
                                                    error: true,
                                                    message: err
                                                })
                                            } else {
                                                if (row.affectedRows > 0) {
                                                    res.json({
                                                        message: "Insert success!",
                                                        data: row
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
                                        res.json({
                                            error: true,
                                            message: "role has already exist"
                                        })
                                    }
                                }
                            })
                        } else {
                            res.json({
                                error: true,
                                message: "no role yet "
                            })
                        }
                    }
                })
            } else {
                res.json({
                    error: true,
                    message: "no user yet "
                })
            }

        }
    })



}

const getUserPermissionViews = (req, res) => {
    var Role_Id = req.query.Role_Id
    var User_Id = req.query.User_Id
    var sql = `SELECT * FROM user_role `
    if (Role_Id && User_Id) {
        sql += ` WHERE User_Id =${User_Id} AND Role_Id=${Role_Id}`
    }

    db.query(sql, (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.length > 0) {
                res.json({
                    data: row
                })
            } else {
                res.json({
                    error: true,
                    message: "No yet setpermission"
                })
            }

        }
    })

}


const updateUserRole = (req, res) => {
    var id = req.body.id
    var Role_Id = req.body.Role_Id
    var User_Id = req.body.User_Id
    if (id === "" || id === undefined) {
        res.json({
            error: true,
            message: "Please fil in id  "
        })
        return
    }
    if (Role_Id === "" || Role_Id === undefined) {
        res.json({
            error: true,
            message: "Please fil in Role_Id  "
        })
        return
    }
    if (User_Id === "" || User_Id === undefined) {
        res.json({
            error: true,
            message: "Please fil in User_Id  "
        })
        return
    }
    db.query("SELECT User_Id FROM user WHERE User_Id = ?", [User_Id], (err1, row1) => {
        if (err1) {
            res.json({
                error: true,
                message: err1
            })
        } else {
            if (row1.length > 0) {
                db.query("SELECT Role_ID FROM role WHERE Role_ID = ?", [Role_Id], (err2, row2) => {
                    if (err2) {
                        res.json({
                            error: true,
                            message: err1
                        })
                    } else {
                        if (row2.length > 0) {
                            db.query("SELECT * FROM user_role WHERE User_Id = ? AND Role_Id =?", [User_Id, Role_Id], (err3, row3) => {
                                if (err3) {
                                    res.json({
                                        error: true,
                                        message: err3
                                    })
                                } else {
                                    if (row3.length === 0) {
                                        const sql = "UPDATE user_role SET User_Id=? , Role_Id=? WHERE Id=?"
                                        const paramet = [User_Id, Role_Id, id]
                                        db.query(sql, paramet, (err, row) => {
                                            if (err) {
                                                res.json({
                                                    error: true,
                                                    message: err
                                                })
                                            } else {
                                                if (row.affectedRows > 0) {
                                                    res.json({
                                                        message: "Insert success!",
                                                        data: row
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
                                        res.json({
                                            error: true,
                                            message: "already set role"
                                        })
                                    }
                                }
                            })
                        } else {
                            res.json({
                                error: true,
                                message: "no role yet "
                            })
                        }
                    }
                })
            } else {
                res.json({
                    error: true,
                    message: "no user yet "
                })
            }

        }
    })

}

const deletePermission = (req, res) => {
    let id = req.body.Role_Id
    if (id === "" || id === undefined) {
        res.json({
            error: true,
            message: "Please fil in id "
        })
        return
    }
    db.query("DELETE FROM `role` WHERE Role_Id=? AND Status=?", [id, 1], (err, row) => {
        if (err) {
            res.json({
                message: err,
                error: true
            })

        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "You have deleted!",
                    data: row

                })
            } else {
                res.json({
                    error: true,
                    message: "delete flase plz check again!"

                })
            }

        }
    })
}

module.exports = {
    setPermission,
    getUserPermissionViews,
    updateUserRole,
    deletePermission
}