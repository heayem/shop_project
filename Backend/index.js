const { urlencoded } = require('express');
const express = require('express')
const app = express()
const port = 8080;
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))

require("./src/Route/User.Route")(app)
require("./src/Route/Category.Route")(app)
require("./src/Route/Product.Route")(app)
require("./src/Route/OrderProduct.Route")(app)
require("./src/Route/auth.Route")(app)
require("./src/Route/role.route")(app)
require("./src/Route/user_role.Route")(app)
require("./src/Route/cart.route")(app)
require("./src/Route/Chart.route")(app)

// console.log(row.key)
app.listen(port, () => {
    console.log(`localhost:${port}`)
})