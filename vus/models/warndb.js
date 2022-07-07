const mongoose = require('mongoose')

const warnmongoose = new mongoose.Schema({
    guild: String,
    user: String,
    content: Array
})

module.exports = mongoose.model("warndb", warnmongoose);