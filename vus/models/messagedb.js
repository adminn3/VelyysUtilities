const mongoose = require('mongoose')

const message = new mongoose.Schema({
    guild: String,
    user: String,
    content: Array
})

module.exports = mongoose.model("AntiLongMessages", message);