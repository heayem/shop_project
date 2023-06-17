const Chart = require("../Rout_Controller/Chart.controller")

const Route = (app) => {
    app.get("/api/today", Chart.GetToday)
    app.get("/api/thismonth", Chart.GetThisMonth)
    app.get("/api/thisyear", Chart.ThisYear)
    // app.get("/api/cart/getByUser/:id", cart.GetByUer)
    // app.post("/api/cart/create", cart.Create)
    // app.put("/api/cart/update", cart.Update)
    // app.delete("/api/cart/delete/:id", cart.Delete)
}

module.exports = Route
