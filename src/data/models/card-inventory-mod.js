const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardInventory = new Schema({
    userId: { type: String, required: true },
    cardId: { type: String, required: true },
    count: { type: Number, default: 1 },
}, { timestamps: true }, );

module.exports = mongoose.model('cardsInventories', CardInventory);