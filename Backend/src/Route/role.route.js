const role = require('../Rout_Controller/permission.Controller')

const Route = (app) => {
    app.post("/api/role", role.createPermission)
    app.get("/api/role", role.getPermissionViews)
    app.get("/api/role/:Id", role.getPermissionbyOne)
    app.put("/api/role/", role.updatePermission)
    app.delete("/api/role/", role.deletePermission)
}

module.exports = Route