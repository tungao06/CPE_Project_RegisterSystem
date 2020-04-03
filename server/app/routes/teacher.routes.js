const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacher.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // TODO : ALL
    app.get("/api/all/teacher/role", controller.allRole);

    // TODO : TEACHER
    app.get(
        "/api/teacher",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.getByUsername
    );
    app.put(
        "/api/teacher",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.putByUsername
    );
    app.delete(
        "/api/teacher",
        //[authJwt.verifyToken, authJwt.isTeacher],
        controller.deleteByUsername
    );
}
