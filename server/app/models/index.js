const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./user.model");
db.teacher = require("./teacher.model");
db.admin = require("./admin.model");
db.register = require("./register.model");

db.ROLES = ["user", "admin", "teacher"];

module.exports = db;