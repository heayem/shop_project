const user_role = require('../Rout_Controller/user_role.Controller')

const Route = (app) => {
    app.post("/api/userRole", user_role.setPermission)
    app.get("/api/userRole", user_role.getUserPermissionViews)
    app.put("/api/userRole", user_role.updateUserRole)
    // app.delete("/api/userRole", role.deletePermission)
}

module.exports = Route