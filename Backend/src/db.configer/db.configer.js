const mysql = require('mysql')

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "shop_project"
})

module.exports = db