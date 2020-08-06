const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeedInventory = new Schema({
    name: { type: String, required: true },
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
    onCraft: { type: { ingredients: [{ id: String, amount: Number }], cost: [{ type: String, amount: Number }], rewardId: String }, required: true },
    onDisolve: { type: { rewardType: String, value: Number }, required: true },
    image: { type: String, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('seedsInventories', SeedInventory);