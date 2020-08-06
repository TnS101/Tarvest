const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Land = new Schema({
    name: { type: String, required: true },
    acreage: { type: Number, required: true },
    onUnlock: { type: [{ type: String, amount: Number }], required: true },
    image: { type: String, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('lands', Land);