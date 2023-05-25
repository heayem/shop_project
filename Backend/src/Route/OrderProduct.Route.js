const orderproduct = require('../Rout_Controller/OrderProduct.Controller')

const Route = (app) => {
    app.get("/api/orderproduct", orderproduct.getAll_OrderProduct) // get all
    app.get("/api/orderprouct/:id", orderproduct.getOne_OrderProduct) // get by  id 
    app.post("/api/orderproduct", orderproduct.CreateOrderProduct) // create order
    app.put("/api/orderproduct", orderproduct.Update_OrderProduct) // update order
    app.delete("/api/orderproduct", orderproduct.Delete_OrderProduct) // delete order 
}
module.exports = Route
