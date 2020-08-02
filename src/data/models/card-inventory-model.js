const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardInventory = new Schema({
    userId: { type: String, required: true },
    cardId: { type: String, required: true },
    count: { type: Number, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('cardsInventories', CardInventory);