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
        var sql = "SELECT c.*,p.P_Name,u.User_Name,DATE_FORMAT(c.Create_at,'%d/%m/%Y %h:%i %p') AS Create_at FROM cart c"
            + " INNER JOIN user u ON u.User_Id = c.User_Id "
            + " INNER JOIN product p ON c.Product_Id = p.P_Id"
    } else {
        sql = "SELECT c.*,p.P_Name,u.User_Name,DATE_FORMAT(c.Create_at,'%d/%m/%Y %h:%i %p') AS Create_at  FROM cart c"
            + " INNER JOIN user u ON u.User_Id = c.User_Id "
            + " INNER JOIN product p ON c.Product_Id = p.P_Id"
            + " ORDER BY Id DESC LIMIT " + start + "," + end + " "

    }

    db.query(sql, (err1, row) => {
        if (err1) {
            res.json({
                error: true,
                message: err1
            })
        } else {
            db.query("SELECT count(Id) AS total FROM cart", (err, row1) => {
                let total = row1[0]?.total
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
    const id = req.params.P_Id
    if (!id) {
        res.json({
            error: true,
            message: "require id "
        })
    }

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
    const id = req.params.User_Id
    if (!id) {
        res.json({
            error: true,
            message: "require user_id "
        })
    }
    let sql = "SELECT c.*,p.P_Name,u.User_Name,p.P_Price,cate.C_Name,p.Images,DATE_FORMAT(c.Create_at,'%d/%m/%Y %h:%i %p') AS Create_at FROM cart c"
        + " INNER JOIN user u ON u.User_Id = c.User_Id "
        + " INNER JOIN product p ON c.Product_Id = p.P_Id "
        + " INNER JOIN category cate ON cate.C_Id = p.Category_Id "
        + " WHERE c.User_Id=?"

    db.query(sql, [id], (err, row) => {

        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            let sql1 = "SELECT SUM(p.P_Price * c.Quantity) AS total,COUNT(c.User_Id) AS recordNum FROM cart c"
                + " INNER JOIN user u ON u.User_Id = c.User_Id "
                + " INNER JOIN product p ON c.Product_Id = p.P_Id "
                + " INNER JOIN category cate ON cate.C_Id = p.Category_Id "
                + " WHERE c.User_Id=?"
            db.query(sql1, [id], (err1, row1) => {
                var total = row1[0]?.total
                var recordNum = row1[0]?.recordNum
                if (!err1) {
                    res.json({
                        data: row,
                        total: total,
                        recordNum: recordNum
                    })
                } else {
                    res.json({
                        error: true,
                        message: err
                    })
                }
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