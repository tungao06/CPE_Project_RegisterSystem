const { authJwt } = require("../middlewares");
const controller = require("../controllers/register.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // TODO : ALL
    app.get("/api/all/register", controller.allRegister);

    // TODO : Register
    app.get(
        "/api/register",
        //[authJwt.verifyToken, authJwt.isRegister],
        controller.getByYear
    );
    app.post(
        "/api/register",
        //[authJwt.verifyToken, authJwt.isRegister],
        controller.postRegister
    );
    app.put(
        "/api/register",
        //[authJwt.verifyToken, authJwt.isRegister],
        controller.putByYear
    );
};
