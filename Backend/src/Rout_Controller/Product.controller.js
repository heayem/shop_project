// const { request } = require('express')
const db = require('../db.configer/db.configer')
const fs = require("fs")
const upload = require("../Route/upload")
const express = require("express")
const CreateProduct = (req, res) => {

    let body = req.body
    let message = {}
    if (body.P_Name == null || body.P_Name == "") {
        message.P_Name = "Plz input your product name"
    }
    if (body.Category_Id == null || body.Category_Id == "") {
        message.Category_Id = "Plz set Category_Id "
    }
    if (body.P_Price == null || body.P_Price == "") {
        message.P_Price = "Plz set P_Price"
    }
    if (body.User_Id == null || body.User_Id == "") {
        message.User_Id = "Plz set User_Id"
    }
    if (body.P_Status == null || body.P_Status == "") {
        message.P_Status = "please set Status"
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    var {
        P_Name, Category_Id, P_Price, P_Description, P_Status, User_Id
    } = req.body;

    var image = "";
    if (req.file) {
        image = req.file.filename
        // image = req.file.originalname
    }

    const sql = "INSERT INTO `product`(`P_Id`,`P_Name`,`Images`,`Category_Id`,`P_Price`,`P_Description`,`P_Status`,`User_Id`,`Date_Post`) VALUES(?,?,?,?,?,?,?,?,?)"
    const paramet = [null, P_Name, image, Category_Id, P_Price, P_Description, P_Status, User_Id, new Date()]
    db.query(sql, paramet, (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
            return false
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
}

const getAll_Product = (req, res) => {
    let Category_Id = req.query.Category_Id
    const page = req.query.page
    let end = 4
    let start = (page - 1) * end
    let name = req.query.name
    let date = req.query.date
    let sql = "SELECT product.*,category.C_Name,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN category ON product.Category_Id=category.C_Id ORDER BY P_Id DESC LIMIT " + start + "," + end + " "
    let sql1 = `SELECT count(P_Id) AS total FROM product`
    // let sql = "SELECT *, DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product ORDER BY P_Id DESC LIMIT 0,7 "
    if (date) {
        sql = `SELECT product.*,category.C_Name,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN category ON product.Category_Id=category.C_Id WHERE Date_Post LIKE '%${date}%'`
    }
    if (Category_Id && name) {
        sql = `SELECT product.*,category.C_Name,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN category ON product.Category_Id=category.C_Id WHERE P_Name LIKE '%${name}%' AND Category_Id = ${Category_Id} `
    }
    if (Category_Id) {
        sql = `SELECT product.*,category.C_Name,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN category ON product.Category_Id=category.C_Id  WHERE Category_Id = ${Category_Id} ORDER BY P_Id DESC LIMIT  ${start},${end} `
        sql1 = `SELECT count(P_Id) AS total FROM product WHERE Category_Id = ${Category_Id} `
    }
    if (name) {
        sql = `SELECT product.*,category.C_Name,DATE_FORMAT(Date_Post,'%d/%m/%Y %h:%i %p') AS Date_Post FROM product INNER JOIN category ON product.Category_Id=category.C_Id WHERE P_Name LIKE '%${name}%'`
    }

    db.query(sql, (err, row) => {
        db.query(sql1, (err1, row1) => {
            let total = row1[0].total
            if (err) {
                res.json({
                    message: err,
                    error: true
                })
                return false
            } else {
                if (row != 0) {
                    // res.write(row[0].P_Price)
                    res.json({
                        RecordNum: total,
                        pageNum: Math.ceil(total / end),
                        list: row,
                    })

                } else {
                    res.json({
                        message: "no product yet",
                        list: row,
                    })
                }

            }
        })


    })
}

const Update_Product = (req, res) => {
    let body = req.body
    let message = {}
    if (body.P_Name == null || body.P_Name == "") {
        message.P_Name = "Plz input your product name"
    }
    if (body.Category_Id == null || body.Category_Id == "") {
        message.Category_Id = "Plz set Category_Id "
    }
    if (body.P_Price == null || body.P_Price == "") {
        message.P_Price = "Plz set P_Price"
    }
    if (body.User_Id == null || body.User_Id == "") {
        message.User_Id = "Plz set User_Id"
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    var {
        P_Name, Category_Id, P_Price, P_Description, User_Id, P_Id, P_Status
    } = req.body;

    var image = "";
    if (req.file) {
        image = req.file.filename
        // image = req.file.originalname
    }

    db.query("SELECT Images from product WHERE P_Id = ?", [P_Id], (err1, result) => {
        var oldImage = "";
        if (!err1) {
            oldImage = result[0].Images
        }

        const sql = "UPDATE `product` SET P_Name=?,Images=?,Category_Id=?,P_Price=?,P_Description=?,P_Status=?,User_Id=?,Date_Post=? WHERE P_Id=?"
        let paramet = [P_Name, image, Category_Id, P_Price, P_Description, P_Status, User_Id, new Date(), P_Id]
        db.query(sql, paramet, (err, row) => {
            const image_Path = "D:/wamp64/www/Images/"
            if (fs.existsSync(image_Path + oldImage)) {
                try {
                    fs.unlinkSync(image_Path + oldImage)
                } catch (err) {
                    console.error(err)
                }
            }

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
    })

}

const Delete_Product = (req, res) => {

    let body = req.body
    let message = {}
    if (body.P_Id == "" || body.P_Id == null || body.P_Id == undefined) {
        message.P_Id = "Plz select Product to delete "
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }
    db.query("SELECT Images from product WHERE P_Id = ?", [body.P_Id], (err1, result) => {
        var oldImage = "";
        if (!err1) {
            oldImage = result[0].Images
        }
        const sql = "DELETE FROM product WHERE P_Id=?"
        db.query(sql, [body.P_Id], (err, row) => {
            if (err) {
                res.json({
                    message: err,
                    error: true
                })
            } else {
                if (row.affectedRows > 0) {
                    const image_Path = "D:/wamp64/www/Images/"
                    if (fs.existsSync(image_Path + oldImage)) {
                        try {
                            fs.unlinkSync(image_Path + oldImage)
                        } catch (err) {
                            console.error(err)
                        }
                    }
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

    })



}

module.exports =
{
    CreateProduct,
    getAll_Product,
    Update_Product,
    Delete_Product
}