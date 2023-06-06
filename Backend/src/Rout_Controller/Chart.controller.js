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

const GetToday = (req, res) => {

    var sql = "SELECT pro.P_Name, AVG(odp.Grand_Total) Price_Total,SUM(cart.Quantity) Quantity_item,cart.Create_at"
    sql += " FROM orderproduct odp "
    sql += " INNER JOIN cart ON odp.cart_id = cart.Id"
    sql += " INNER join product pro ON cart.Product_Id = pro.P_Id "
    sql += " GROUP BY cart.Product_Id,cart.Create_at"
    sql += " HAVING cart.Create_at = CURDATE()"
    db.query(sql, (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            res.json({

                list: row
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
    GetToday,
    GetByone,
    GetByUer,
    Create,
    Update,
    Delete
}