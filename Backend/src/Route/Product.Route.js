const Product_Controller = require('../Rout_Controller/Product.controller')
const upload = require("./upload")


const Route = (app) => {
    app.get("/api/product", Product_Controller.getAll_Product)
    app.get("/api/product/slide", Product_Controller.Slide)
    app.get("/api/product/one/:P_Id", Product_Controller.getOne_Product)
    app.get("/api/product/detail/:P_Id", Product_Controller.getOne_Detail)
    app.get("/api/product/randomCartClient", Product_Controller.randomCartClient)
    app.post("/api/create/product", upload.upload.single("images"), Product_Controller.CreateProduct)
    app.put("/api/product", upload.upload.single("images"), Product_Controller.Update_Product)
    app.delete("/api/product", Product_Controller.Delete_Product)
}


module.exports = Route
