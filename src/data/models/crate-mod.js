const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Crate = new Schema({
    name: { type: String, required: true },
    buy: { type: Number, required: true },
    image: { type: String, required: true },
    onOpen: { type: { itemRewards: [{ id: String, amount: Number }], valueRewards: [{ type: String, amount: Number }] }, required: true },
    chances: { type: [{ type: String, amount: Number }], required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('crates', Crate);