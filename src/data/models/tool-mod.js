const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tool = new Schema({
    name: { type: String, required: true },
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
    durability: { type: Number, required: true },
    bonuses: { type: [{ type: String, amount: Number }], required: false },
}, { timestamps: true }, );

module.exports = mongoose.model('tools', Tool);