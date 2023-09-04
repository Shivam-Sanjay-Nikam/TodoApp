
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duedate: {
            type: Date,
            required: true
        },
        priority: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
        },
        user_id:{
            type:String,
            required:true,
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);