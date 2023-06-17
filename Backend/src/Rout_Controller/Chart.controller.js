const db = require('../db.configer/db.configer')


const GetToday = (req, res) => {

    var sql = "SELECT DATE_FORMAT(Date_Post,'%D-%M-%Y') date,SUM(Grand_Total) total "
    sql += " FROM orderproduct WHERE DATE_FORMAT(Date_Post,'%Y-%m-%d') = CURRENT_DATE()"
    sql += " AND order_status = 5"
    sql += " GROUP BY DATE_FORMAT(Date_Post,'%Y-%m-%d') "
    db.query(sql, (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {

            if (row.length == 0) {
                res.json({
                    data: row = [{ date: new Date(), total: 00 }]
                })
            } else {
                res.json({
                    data: row
                })
            }
        }
    })


}
const GetThisMonth = (req, res) => {

    var sql = "SELECT DATE_FORMAT(Date_Post,'%M-%Y') date,SUM(Grand_Total) total "
    sql += " FROM orderproduct WHERE DATE_FORMAT(Date_Post,'%Y-%m') = DATE_FORMAT(CURRENT_DATE(),'%Y-%m') "
    sql += " AND order_status = 5"
    sql += " GROUP BY month(CURRENT_DATE())"
    db.query(sql, (err, row) => {
        if (err) {
            res.json({
                error: true,
                message: err
            })
        } else {
            if (row.length == 0) {
                res.json({
                    data: row = [{ date: new Date(), total: 00 }]
                })
            } else {
                res.json({
                    data: row
                })
            }
        }
    })

}
const ThisYear = (req, res) => {

    var sql = "SELECT DATE_FORMAT(Date_Post, '%M') name, AVG(Grand_Total) Average"
    sql += " FROM `orderproduct` "
    sql += " WHERE  order_status = 5"
    sql += " GROUP BY Date_Post,Year(Date_Post)"
    sql += " HAVING Year(Date_Post) = YEAR(now())"
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




module.exports =
{
    GetToday,
    GetThisMonth,
    ThisYear
}