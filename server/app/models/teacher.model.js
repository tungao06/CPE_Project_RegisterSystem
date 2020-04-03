const mongoose = require("mongoose");

const Teacher = mongoose.model(
    "Teacher",
    new mongoose.Schema({
        username: { type: String },
        password: { type: String },
        email: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        image: { type: String },
        prefix: { type: String },
        year: { type: Number },
        header: { type: String },
        professional: { type: String },
        status: { type: String },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
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

module.exports = Teacher;