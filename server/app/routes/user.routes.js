const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // TODO : ALL
  app.get("/api/all", controller.allAccess);


  // TODO : USER
  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.getByUsername
  );
  app.put(
    "/api/teacher",
    [authJwt.verifyToken, authJwt.isUser],
    controller.putByUsername
  );


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


  // TODO : ADMIN
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getByUsername
  );
  app.put(
    "/api/teacher",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.putByUsername
  );
};
