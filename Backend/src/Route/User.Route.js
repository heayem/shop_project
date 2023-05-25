const User_Route_Controller = require("../Rout_Controller/User.Controller")
// const { jwt_Verify } = require('../Rout_Controller/auth.Controller')


const Route = (app) => {
    //get all user list
    app.post("/api/user", User_Route_Controller.CreateUser)
    app.put("/api/user", User_Route_Controller.Update_User)
    app.put("/api/userTime", User_Route_Controller.Update_User_Time)
    app.delete("/api/user", User_Route_Controller.Delete_User)
    app.get("/api/user", User_Route_Controller.getAll_User)
    app.get("/api/user/:id", User_Route_Controller.getOne_User)

}



module.exports = Route