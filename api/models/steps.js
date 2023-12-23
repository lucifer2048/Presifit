const mongoose = require("mongoose");

const stepsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    steps: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Steps = mongoose.model("Steps", stepsSchema);

module.exports = Steps;