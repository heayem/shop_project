const cart = require('../Rout_Controller/cart.controller')

const Route = (app) => {
    app.get("/api/cart/getList", cart.GetAll)
    app.get("/api/cart/getById/:id", cart.GetByone)
    app.get("/api/cart/getByUser/:id", cart.GetByUer)
    app.post("/api/cart/create", cart.Create)
    app.put("/api/cart/update", cart.Update)
    app.delete("/api/cart/delete/:id", cart.Delete)
}

module.exports = Route
