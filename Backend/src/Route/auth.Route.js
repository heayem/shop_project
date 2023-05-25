const auth = require('../Rout_Controller/auth.Controller')

const Route = (app) => {
    app.post("/api/login", auth.login)
    app.post("/api/getList", auth.getListProduct)
}

module.exports = Route
