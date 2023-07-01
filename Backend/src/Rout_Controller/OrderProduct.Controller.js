
const db = require('../db.configer/db.configer')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const CreateOrderProduct = (req, res) => {

    let body = req.body
    let message = {}
    if (body.Discount == "" || body.Discount == null || body.Discount == undefined) {
        message.Discount = "plz input Discount"
    }
    //will delete this constrain . when i do it again 
    if (body.order_num == "" || body.order_num == null || body.order_num == undefined) {
        message.order_num = "plz input order_num"
    }
    if (body.order_status == "" || body.order_status == null || body.order_status == undefined) {
        message.order_status = "plz input order_status"
    }
    if (Object.keys(message) > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var User_Id
    var authHeader = req.headers["authorization"]
    if (authHeader) {
        authHeader = authHeader.split(" ");
        var token = authHeader[1]

        if (token == null) {
            return res.sendStatus(401)
        } else {
            jwt.verify(token, process.env.ACCES_TOKEN, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    User_Id = req.user = user.user.User_Id
                    var select = "SELECT cart.User_Id,cart.Id,cart.Quantity, product.P_Id,product.P_Price FROM cart "
                    select += " INNER JOIN product ON cart.Product_Id = product.P_Id "
                    select += " WHERE cart.User_Id=?"
                    db.query(select, [User_Id], (err, result) => {

                        if (!err) {
                            if (result.length > 0) {
                                var cart = result
                                var Is_Succes = 0
                                cart?.forEach(item => {
                                    var user_id = item.User_Id
                                    var P_Id = item.P_Id
                                    var qty = item.Quantity
                                    var price = item.P_Price
                                    var Total = (qty * price)
                                    var Discount = body.Discount
                                    var Grand_Total = Total - (Total * Number(Discount) / 100)
                                    const sql = "INSERT INTO `orderproduct`(`Order_product_Id`,`User_Id`,P_Id,`Total`,`Discount`,`Grand_Total`,`order_status`,`payment_id`,`Description`,`Date_Post`) VALUES(?,?,?,?,? ,?,?,?,?,?)"
                                    const paramet = [null, user_id, P_Id, Total, body.Discount, Grand_Total, body.order_status, body.payment_id, body.Description, new Date()]
                                    db.query(sql, paramet, (err, row) => {
                                        if (err) {
                                            Is_Succes = 1
                                        }
                                    })
                                })

                                if (Is_Succes == 0) {
                                    let = sql = "DELETE FROM cart WHERE User_Id=?"
                                    db.query(sql, [User_Id], (err, row) => { })
                                    res.json({
                                        message: "Inserted"
                                    })
                                } else if (Is_Succes == 1) {
                                    res.json({
                                        error: true,
                                        message: "Order not succes"
                                    })
                                }


                            } else {
                                res.json({
                                    error: true,
                                    message: "cart not found"
                                })
                            }


                        } else {
                            res.json({
                                error: true,
                                message: "cart not found"
                            })
                        }

                    })


                }


            })
        }


    }




}

const getAll_OrderProduct = (req, res) => {

    var sql = "SELECT od.* FROM orderproduct od "
    sql += " INNER JOIN cart ON od.cart_id = cart.Id "
    db.query(sql, (err, row) => {

        if (err) {
            res.json({
                message: err,
                error: true

            })
        } else {
            if (row != 0) {
                res.json({
                    list: row,
                })


            } else {
                res.json({
                    message: "no order yet"
                })
            }

        }

    })
}

const getOne_OrderProduct = (req, res) => {
    let cart_id = req.query.cart_id
    let User_Id = req.query.user_id
    let order_status = req.query.order_status

    var sql = "SELECT od.*,p.P_Name,u.User_Name,DATE_FORMAT(od.Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post  FROM orderproduct od "
    sql += " INNER JOIN cart ON od.cart_id = cart.Id "
    sql += " INNER JOIN product p ON cart.Product_Id = p.P_Id "
    sql += " INNER JOIN user u ON cart.User_Id = u.User_Id "
    sql += " WHERE u.User_Id=? AND cart.Id=? AND od.order_status=?"
    // sql += " WHERE od.Order_Product_Id=?"
    db.query(sql, [User_Id, cart_id, order_status], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.length > 0) {
                res.json({
                    RecordNum: row.length,
                    list: row

                })


            } else {
                res.json({
                    message: "no order ( not found )"
                })
            }

        }

    })

}

// update // i'm not yet modify it
const update = (req, res) => {

    let body = req.body
    let message = {}
    if (body.cart_id == "" || body.cart_id == null) {
        message.cart_id = "plz input cart_id"
    }
    if (body.Discount == "" || body.Discount == null || body.Discount == undefined) {
        message.Discount = "plz input Discount"
    }
    if (body.order_num == "" || body.order_num == null || body.order_num == undefined) {
        message.order_num = "plz input order_num"
    }
    if (body.order_status == "" || body.order_status == null || body.order_status == undefined) {
        message.order_status = "plz input order_status"
    }
    if (Object.keys(message) > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    var select = "SELECT cart.Id,cart.Quantity,product.P_Price FROM cart "
    select += " INNER JOIN product ON cart.Product_Id = product.P_Id "
    select += " WHERE cart.Id=?"
    db.query(select, [body.cart_id], (err, result) => {

        if (!err) {
            if (result.length > 0) {
                var cart = result[0].Id
                var qty = result[0].Quantity
                var price = result[0].P_Price
                var Total = (qty * price)
                var Discount = body.Discount
                var Grand_Total = Total - (Total * Number(Discount) / 100)

                const sql = "INSERT INTO `orderproduct`(`Order_product_Id`,`cart_id`,`Total`,`Discount`,`Grand_Total`,`order_status`,`payment_id`,`Description`,`Date_Post`) VALUES(?,?,?,?,?,?,?,?,?)"
                const paramet = [null, cart, Total, body.Discount, Grand_Total, body.order_status, body.payment_id, body.Description, new Date()]
                db.query(sql, paramet, (err, row) => {
                    if (err) {
                        res.json({
                            error: true,
                            message: err
                        })
                    }
                    else {
                        if (row.affectedRows > 0) {
                            res.json({
                                message: "Insert success!",
                            })
                        } else {
                            res.json({
                                message: "Insert no succes!",
                            })
                        }

                    }

                })
            } else {
                res.json({
                    error: true,
                    message: "cart not found"
                })
            }


        } else {
            res.json({
                error: true,
                message: "cart not found"
            })
        }

    })


}
module.exports =
{
    CreateOrderProduct,
    getAll_OrderProduct,
    getOne_OrderProduct
}