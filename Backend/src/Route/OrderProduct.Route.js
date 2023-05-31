const orderproduct = require('../Rout_Controller/OrderProduct.Controller')

const Route = (app) => {
    app.get("/api/orderproduct", orderproduct.getAll_OrderProduct) // get all
    app.get("/api/orderprouct", orderproduct.getOne_OrderProduct) // get by  id 
    app.post("/api/orderproduct", orderproduct.CreateOrderProduct) // create order
}
module.exports = Route
