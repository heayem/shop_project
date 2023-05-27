const db = require('../db.configer/db.configer')


const Create = (req, res) => {
    let body = req.body
    let message = {}
    if (body.User_Id == "" || body.User_Id == null) {
        message.User_Id = "plz input name User_Id"
    }
    if (body.Product_Id == "" || body.Product_Id == null || body.Product_Id == undefined) {
        message.Product_Id = "plz input Product_Id"
    }
    if (body.Qty == "" || body.Qty == null || body.Qty == undefined) {
        message.C_Name = "plz input Qty"
    }
    if (Object.keys(message) > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    const sql = "INSERT INTO `cart`(`Id`,`User_Id`,`Product_Id`,`Quantity`) VALUES(?,?,?,?)"
    db.query(sql, [null, body.User_Id, body.Product_Id, body.Qty], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "Insert Succes!",
                    list: row
                })
            } else {
                res.json({
                    message: "Insert false!",

                })
            }
        }
    })
}

const GetAll = (req, res) => {
    const page = req.query.page
    let end = 4
    let start = (page - 1) * end
    if (!page) {
        var sql = "SELECT * FROM cart"
    } else {
        sql = "SELECT * FROM cart ORDER BY Id DESC LIMIT " + start + "," + end + " "

    }

    db.query(sql, (err1, row) => {
        if (err1) {
            res.json({
                error: true,
                message: err1
            })
        } else {
            db.query("SELECT count(Id) AS total FROM cart", (err, row1) => {
                let total = row1[0].total
                if (err) {
                    res.json({
                        error: true,
                        message: err
                    })
                }
                else {
                    if (row != 0) {
                        res.json({
                            RecordNum: total,
                            pageNum: Math.ceil(total / end),
                            list: row
                        })
                    } else {
                        res.json({
                            message: "Not yet cart "
                        })
                    }

                }
            })
        }
    })


}
const GetByone = (req, res) => {
    if (!id) {
        res.json({
            error: true,
            message: "require id "
        })
    }
    const { id } = req.params
    let = sql = "SELECT * FROM cart WHERE Id=?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({
                data: row
            })
        }
    })

}
const GetByUer = (req, res) => {
    const { id } = req.params
    if (!id) {
        res.json({
            error: true,
            message: "require user_id "
        })
    }
    let = sql = "SELECT * FROM cart WHERE User_Id=?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({
                data: row
            })
        }
    })

}


const Update = (req, res) => {
    let body = req.body
    let message = {}
    if (body.Id == "" || body.Id == null) {
        message.Id = "plz input name Id"
    }
    if (body.User_Id == "" || body.User_Id == null) {
        message.User_Id = "plz input name User_Id"
    }
    if (body.Product_Id == "" || body.Product_Id == null || body.Product_Id == undefined) {
        message.Product_Id = "plz input Product_Id"
    }
    if (body.Qty == "" || body.Qty == null || body.Qty == undefined) {
        message.C_Name = "plz input Qty"
    }
    if (Object.keys(message) > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    const sql = "UPDATE `cart` SET User_Id=?,Product_Id=?,Quantity=? WHERE Id=?"
    db.query(sql, [body.User_Id, body.Product_Id, body.Qty, body.Id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        }
        else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "Update Succes!",
                    list: row
                })
            } else {
                res.json({
                    message: "Update false!",

                })
            }
        }
    })
}

const Delete = (req, res) => {
    const { id } = req.params

    if (!id) {
        res.json({
            error: true,
            message: "require id "
        })
    }
    let = sql = "DELETE FROM cart WHERE Id=?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({
                message: "Deleted"
            })
        }
    })

}


module.exports =
{
    GetAll,
    GetByone,
    GetByUer,
    Create,
    Update,
    Delete
}