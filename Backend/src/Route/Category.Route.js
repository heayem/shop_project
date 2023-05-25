const Category_controller = require('../Rout_Controller/Category.Controller')

const Route = (app) => {
    app.get("/api/category", Category_controller.GetAll_Category)
    app.post("/api/category", Category_controller.Create_Category)
    app.put("/api/category", Category_controller.Update_Category)
    app.delete("/api/category", Category_controller.Delete_Category)
}

module.exports = Route
