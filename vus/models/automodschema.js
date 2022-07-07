const mongoose = require('mongoose')

const WarnDbSchema = new mongoose.Schema({
    guild: String,
    user: String,
    content: Array 
})

module.exports = mongoose.model("WarnDatabaseSchema", WarnDbSchema);