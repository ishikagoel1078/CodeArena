const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    title: String,

    difficulty: String,

    description: String

});

module.exports =
mongoose.model(
    "Problem",
    problemSchema
);