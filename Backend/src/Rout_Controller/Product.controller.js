// const { request } = require('express')
const db = require('../db.configer/db.configer')
const fs = require("fs")
const upload = require("../Route/upload")
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
    db.query("SELECT P_Name FROM product WHERE P_Name=?", [P_Name], (err, row1) => {
        if (err) {
            res.json({
                error: true,
                message: err.sqlMessage
            })
            return false
        } else {
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
                        message: err.sqlMessage
                    })
                    return false
                }
                else {
                    if (row.affectedRows > 0) {
                        res.json({
                            message: "Insert success!",

                        })
                    } else {
                        res.json({
                            message: "Input no succes!",
                        })
                    }

                }

            })
        }
    })



}


const getOne_Product = (req, res) => {
    var param = req.params.P_Id
    var sql = "SELECT * FROM product WHERE Images IS NOT NULL AND Images != '' AND Category_Id=?"
    db.query(sql, [param], (err, row) => {
        if (!err) {
            res.json({
                data: row
            })
        } else {
            res.json({
                error: true,
                message: err
            })
        }
    })

}
const getOne_Detail = (req, res) => {
    var param = req.params.P_Id
    var sql = " SELECT p.*,c.C_Name FROM product p "
    sql += " INNER JOIN category c  ON c.C_Id = p.Category_Id "
    sql += " WHERE p.Images IS NOT NULL AND p.Images != '' AND p.P_Id=?"
    db.query(sql, [param], (err, row) => {

        delete row[0].User_Id
        if (!err) {
            res.json({
                data: row
            })
        } else {
            res.json({
                error: true,
                message: err
            })
        }
    })

}


const getAll_Product = (req, res) => {
    let Category_Id = req.query.Category_Id
    const page = req.query.page
    let end = 10
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
                    message: err.sqlMessage,
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

const randomCartClient = (req, res) => {
    var sql = "SELECT p.*,c.C_Name AS category FROM product p"
    sql += " INNER JOIN category c ON p.Category_Id = c.C_Id "
    sql += " WHERE p.Images IS NOT NULL AND p.Images != '' ORDER BY RAND() LIMIT 10"
    db.query(sql, (err, row) => {
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

const Slide = (req, res) => {
    var sql = "SELECT p.*,c.C_Name category FROM product p"
    sql += " INNER JOIN category c ON p.Category_Id = c.C_Id "
    sql += " WHERE p.Images IS NOT NULL AND p.Images != ''"
    db.query(sql, (err, row) => {
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


const Update_Product = (req, res) => {
    let body = req.body;
    let message = {};

    if (body.P_Name == null || body.P_Name == "") {
        message.P_Name = "Please input your product name";
    }
    if (body.Category_Id == null || body.Category_Id == "") {
        message.Category_Id = "Please set Category_Id";
    }
    if (body.P_Price == null || body.P_Price == "") {
        message.P_Price = "Please set P_Price";
    }
    if (body.User_Id == null || body.User_Id == "") {
        message.P_Status = "Please set User_Id";
    }
    if (body.P_Status == null || body.P_Status == "") {
        message.P_Status = "Please set P_Status";
    }

    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        });
        return false;
    }

    var {
        P_Name,
        Category_Id,
        P_Price,
        P_Description,
        User_Id,
        P_Id,
        P_Status
    } = req.body;

    var image = "";
    if (req.file) {
        image = req.file.filename;

        db.query("SELECT Images from product WHERE P_Id = ?", [P_Id], (err1, result) => {
            var oldImage = "";
            if (!err1) {
                oldImage = result[0].Images
                const image_Path = "D:/wamp64/www/Images/"
                if (fs.existsSync(image_Path + oldImage)) {
                    try {
                        fs.unlinkSync(image_Path + oldImage)
                    } catch (err) {
                        console.error(err)
                    }
                }
            }


        })

    } else if (body.images) {
        // To keep the existing image if none is uploaded
        image = body.images;
    }
    console.log(image)


    const sql = "UPDATE `product` " +
        "SET P_Name=?, " +
        "Category_Id=?, " +
        "P_Price=?, " +
        "P_Description=?, " +
        "P_Status=?, " +
        "User_Id=?, " +
        (req.file ? "Images=?, " : "") + // only add this line if an image was provided in the request
        "Date_Post=? " +
        "WHERE P_Id=?";

    let paramet = [P_Name, Category_Id, P_Price, P_Description, P_Status, User_Id];

    if (req.file) { // only add this parameter if an image was provided in the request
        paramet.push(image);
    }

    paramet.push(new Date(), P_Id);

    db.query(sql, paramet, (err, row) => {
        if (err) {
            res.json({
                message: err.sqlMessage,
                error: true
            });
        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "You have updated!",
                    list: row
                });
            } else {
                res.json({
                    message: "Updated false, please check again!",
                    list: row
                });
            }

        }
    });
};

// const Update_Product = (req, res) => {
//     let body = req.body
//     let message = {}
//     if (body.P_Name == null || body.P_Name == "") {
//         message.P_Name = "Plz input your product name"
//     }
//     if (body.Category_Id == null || body.Category_Id == "") {
//         message.Category_Id = "Plz set Category_Id "
//     }
//     if (body.P_Price == null || body.P_Price == "") {
//         message.P_Price = "Plz set P_Price"
//     }
//     if (body.User_Id == null || body.User_Id == "") {
//         message.User_Id = "Plz set User_Id"
//     }

//     if (Object.keys(message).length > 0) {
//         res.json({
//             error: true,
//             message: message
//         })
//         return false
//     }
//     var {
//         P_Name, Category_Id, P_Price, P_Description, User_Id, P_Id, P_Status
//     } = req.body;

//     // var image = "";
//     // if (req.file) {
//     //     image = req.file.filename
//     //     // image = req.file.originalname
//     // }
//     var image = "";
//     if (req.file) {
//         image = req.file.filename;
//     } else {
//         // To keep the existing image if none is uploaded
//         image = body.images || "";
//     }

//     const sql = "UPDATE `product` SET P_Name=?,Images=IFNULL(?,Images),Category_Id=?,P_Price=?,P_Description=?,P_Status=?,User_Id=?,Date_Post=? WHERE P_Id=?"
//     let paramet = [P_Name, image, Category_Id, P_Price, P_Description, P_Status, User_Id, new Date(), P_Id]
//     db.query(sql, paramet, (err, row) => {
//         if (err) {
//             res.json({
//                 message: err,
//                 error: true

//             })
//         } else {
//             if (row.affectedRows > 0) {
//                 res.json({
//                     message: "You have Updated!",
//                     list: row

//                 })
//             } else {
//                 res.json({
//                     message: "Updated flase plz check again!",
//                     list: row

//                 })
//             }

//         }
//     })


// }

// db.query("SELECT Images from product WHERE P_Id = ?", [P_Id], (err1, result) => {
//     var oldImage = "";
//     if (!err1) {
//         oldImage = result[0].Images
//     }
// const image_Path = "D:/wamp64/www/Images/"
// if (fs.existsSync(image_Path + oldImage)) {
//     try {
//         fs.unlinkSync(image_Path + oldImage)
//     } catch (err) {
//         console.error(err)
//     }
// }

// })

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
                    message: err.sqlMessage,
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
    getOne_Product,
    Update_Product,
    getOne_Detail,
    Slide,
    randomCartClient,
    Delete_Product
}