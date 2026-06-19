const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userName: String,
    problemTitle: String,
    code: String,
    score: Number,
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports =
    mongoose.model(
        "Submission",
        submissionSchema
    );