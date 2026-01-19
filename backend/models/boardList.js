const mongoose = require('mongoose');
const boardListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    description:{ type: String },
    dueDate: { type: Date },
    labels: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
module.exports = mongoose.model("BoardList", boardListSchema);
 
