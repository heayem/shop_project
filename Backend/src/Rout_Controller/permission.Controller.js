const db = require('../db.configer/db.configer')

const createPermission = (req, res) => {
    var name = req.body.Name
    if (name === "" || name === undefined) {
        res.json({
            error: true,
            message: "Please fil in name "
        })
        return
    }
    db.query("SELECT Name FROM role WHERE Name = ? ", [name], (err1, row1) => {
        if (err1) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row1.length === 0) {
                const sql = "INSERT INTO role value(?,?,?)"
                const paramet = [null, name, 1]
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

}

const getPermissionViews = (req, res) => {

    db.query("SELECT * FROM role", (err, row) => {
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
                    message: "No permission"
                })
            }

        }
    })

}
const getPermissionbyOne = (req, res) => {
    let id = req.params.Id
    if (id === "" || id === undefined) {
        res.json({
            error: true,
            message: "Please fil in id "
        })
        return
    }
    db.query("SELECT * FROM role WHERE Role_Id = ?", [id], (err, row) => {
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
                    message: "No permission"
                })
            }
        }
    })

}

const updatePermission = (req, res) => {
    let id = req.body.Role_Id
    let name = req.body.Name
    let status = req.body.Status
    if (id === "" || id === undefined) {
        res.json({
            error: true,
            message: "Please fil in id "
        })
        return
    } if (name === "" || name === undefined) {
        res.json({
            error: true,
            message: "Please fil in name "
        })
        return
    } if (status === "" || status === undefined) {
        res.json({
            error: true,
            message: "Please fil in status "
        })
        return
    }
    db.query("UPDATE `role` SET Name=?,Status=? WHERE Role_Id=?", [name, status, id], (err, row) => {
        if (err) {
            res.json({
                message: err,
                error: true
            })
        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "You have Updated!",
                    data: row

                })
            } else {
                res.json({
                    error: true,
                    message: "Updated flase plz check again!"

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
    createPermission,
    getPermissionViews,
    getPermissionbyOne,
    updatePermission,
    deletePermission
}