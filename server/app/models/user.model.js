const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gpax: { type: Number },
    image: { type: String },
    prefix: { type: String },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
  )
);

module.exports = User;