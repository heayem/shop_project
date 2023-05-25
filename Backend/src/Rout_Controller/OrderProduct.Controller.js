// const { request } = require('express')
const { json } = require('express')
const db = require('../db.configer/db.configer')


const CreateOrderProduct = (req, res) => {

    let body = req.body
    let message = {}

    if (body.User_Id == null || body.User_Id == "") {
        message.User_Id = "Plz set User_Id"
    }
    if (body.P_Id == null || body.P_Id == "") {
        message.P_Id = "Plz input your product Id"
    }
    if (body.Qty == null || body.Qty == "") {
        message.Qty = "Plz set Qty "
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    var selectPrice = "SELECT P_Price FROM product WHERE P_Id=?"
    db.query(selectPrice, [body.P_Id], (err, result) => {
        var Qty = body.Qty
        var P_Price = 0;
        var Discount = body.Discount

        if (!err) {
            result.map((element, index) => {
                return P_Price = element.P_Price
            })
            var Total = (Number(Qty) * Number(P_Price))
            const sql = "INSERT INTO `orderproduct`(`S_Id`,`User_Id`,`P_Id`,`Qty`,`Total`,`Discount`,`Grand_Total`,`Status`,`Description`,`Date_Post`) VALUES(?,?,?,?,?,?,?,?,?,?)"
            const paramet = [null, body.User_Id, body.P_Id, Number(Qty), Number(Total), Number(Discount), (Total - (Total * Number(Discount))), 1, body.Description, new Date()]
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
                            RecordNum: row.length,
                            data: row
                        })
                    } else {
                        res.json({
                            message: "Input no succes!",
                        })
                    }

                }

            })
        } else {
            res.json({
                error: true,
                message: "Product not found"
            })
        }

    })


}


const getAll_OrderProduct = (req, res) => {

    var sql ="SELECT O.S_Id, U.User_Name, P.P_Name,P.P_Price,O.Qty, O.Total, O.Discount, O.Grand_Total, O.Status, O.Description, DATE_FORMAT(O.Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post "
        sql+=" FROM((orderproduct AS O INNER JOIN user AS U ON O.User_Id = U.User_Id) "
        sql+=" INNER JOIN product AS P ON O.P_Id = P.P_Id) ORDER BY O.S_Id DESC "

    db.query(sql, (err, row) => {

        if (err) {
            res.json({
                message: err,
                error: true

            })
        } else {
            if (row != 0) {

                res.json({
                    RecordNum: row.length,
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
    let id = req.params.id
     var sql ="SELECT O.S_Id, U.User_Name, P.P_Name,P.P_Price,O.Qty, O.Total, O.Discount, O.Grand_Total, O.Status, O.Description,  DATE_FORMAT(O.Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post "
        sql+=" FROM((`orderproduct` AS O INNER JOIN user AS U ON O.User_Id = U.User_Id) "
        sql+=" INNER JOIN product AS P ON O.P_Id = P.P_Id) WHERE O.S_Id = ? "
    db.query(sql, [id], (err, row) => {
        Row = row
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
                    message: "no order ( not found )"
                })
            }

        }

    })

}

const Update_OrderProduct = (req, res) => {
    let body = req.body
    let message = {}
    if (body.User_Id == null || body.User_Id == "") {
        message.User_Id = "Plz input user Id"
    }
    if (body.Status == null || body.Status == "") {
        message.Status = "Plz set Status"
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    const sql = "UPDATE `orderproduct` SET User_Id=?,Status=?,Description=?,Date_Post=? WHERE S_Id=?"
    let paramet = [body.User_Id,body.Status, body.Description,new Date() , body.S_Id]
    db.query(sql, paramet, (err, row) => {
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

const Delete_OrderProduct = (req, res) => {

    let body = req.body
    let message = {}
    if (body.S_Id == "" || body.S_Id == null || body.S_Id == undefined) {
        message.P_Id = "Plz select sale to delete "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    const sql = "DELETE FROM orderproduct WHERE S_Id=?"
    db.query(sql, [body.S_Id], (err, row) => {
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

}

module.exports =
{
    CreateOrderProduct,
    getAll_OrderProduct,
    getOne_OrderProduct,
    Update_OrderProduct,
    Delete_OrderProduct
}