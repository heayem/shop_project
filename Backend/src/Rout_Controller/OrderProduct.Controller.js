
const db = require('../db.configer/db.configer')


const CreateOrderProduct = (req, res) => {

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

                const sql = "INSERT INTO `orderproduct`(`Order_product_Id`,`cart_id`,`order_num`,`Total`,`Discount`,`Grand_Total`,`order_status`,`payment_id`,`Description`,`Date_Post`) VALUES(?,?,?,?,?,?,?,?,?,?)"
                const paramet = [null, cart, body.order_num, Total, body.Discount, Grand_Total, body.order_status, body.payment_id, body.Description, new Date()]
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

    var sql = "SELECT od.*,p.P_Name,u.User_Name FROM orderproduct od "
    sql += " INNER JOIN cart ON od.cart_id = cart.Id "
    sql += " INNER JOIN product p ON cart.Id = p.P_Id "
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

module.exports =
{
    CreateOrderProduct,
    getAll_OrderProduct,
    getOne_OrderProduct
}