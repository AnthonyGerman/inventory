const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    room: {type: String, required: true, maxLength: 25},
    container: {type: String, maxLength: 30},
    content: {type: String, required: true, maxLength: 200},
});

module.exports = mongoose.model("Item", ItemSchema);