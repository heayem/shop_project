const db = require('../db.configer/db.configer')

const Create_Category = (req, res) => {
    let body = req.body
    let message = {}
    if (body.C_Name == "" || body.C_Name == null) {
        message.C_Name = "plz input name category"
    }
    if (body.C_Order == "" || body.C_Order == null || body.C_Order == undefined) {
        message.C_Name = "plz input num order category"
    }
    if (body.User_Id == "" || body.User_Id == null || body.User_Id == undefined) {
        message.C_Name = "plz input user(id) ouwner"
    }
    if (Object.keys(message) > 0) {
        res.json({
            error: true,
            message: message
        })
        return false
    }

    const sql = "INSERT INTO `category`(`C_Id`,`C_Name`,`C_Order`,`C_Status`,`User_Id`) VALUES(?,?,?,?,?)"
    db.query(sql, [null, body.C_Name, body.C_Order, 1, body.User_Id], (err, row) => {
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

const GetAll_Category = (req, res) => {
    const page = req.query.page
    let end = 4
    let start = (page - 1) * end
    if (!page) {
        var sql = "SELECT * FROM category WHERE C_Status = 1 "
    } else {
        sql = "SELECT C.*,U.User_Name AS User_Name FROM category AS C INNER JOIN user AS U ON C.User_Id = U.User_Id ORDER BY C.C_Id DESC LIMIT " + start + "," + end + " "

    }

    db.query(sql, (err, row) => {
        db.query("SELECT count(C_Id) AS total FROM category", (err, row1) => {
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
                        message: "Not yet category "
                    })
                }

            }
        })
    })

}


const Update_Category = (req, res) => {
    let body = req.body
    let message = {}
    if (body.C_Name == "" || body.C_Name == null) {
        message.C_Name = "Plz input name"
    }
    if (body.C_Order == "" || body.C_Order == null || body.C_Order == undefined) {
        message.C_Order = "Plz set order list"
    }
    if (body.C_Status == "" || body.C_Status == null || body.C_Status == undefined) {
        message.C_Status = "Plz set status category"
    }
    if (body.User_Id == "" || body.User_Id == null || body.User_Id == undefined) {
        message.User_Id = "unknow user id plz feil it "
    }
    if (body.C_Id == "" || body.C_Id == null || body.C_Id == undefined) {
        message.C_Id = "no id to update plz feil it "
    }

    if (Object.keys(message) > 0) {
        res.json({
            message: message
        })
        return false
    }
    const sql = "UPDATE category SET C_Name=?,C_Order=?,C_Status=?,User_Id=? WHERE C_Id=?"
    db.query(sql, [body.C_Name, body.C_Order, body.C_Status, body.User_Id, body.C_Id], (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.affectedRows > 0) {
                res.json({
                    message: "Updated!",
                    list: row
                })
            } else {
                res.json({
                    message: "Update was wrong (id not found)",
                    error: true
                })
            }
        }
    })


}

const Delete_Category = (req, res) => {
    let body = req.body
    if (body.C_Id == "" || body.C_Id == null) {
        res.json({
            message: "Plz set id to delete"
        })
        return false
    }

    const sql = "DELETE FROM category WHERE C_Id=?"
    db.query(sql, [body.C_Id], (err, row) => {
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
    GetAll_Category,
    Create_Category,
    Update_Category,
    Delete_Category
}