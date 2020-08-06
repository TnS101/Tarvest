const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Crop = new Schema({
    name: { type: String, required: true },
    cardId: { type: String, required: true },
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
    onCraft: { type: { ingredients: [{ id: String, amount: Number }], cost: [{ type: String, amount: Number }], rewardId: String }, required: true },
    onDisolve: { type: { rewardType: String, amount: Number }, required: true },
    rank: { type: Number, required: true },
    xp: { type: Number, required: true },
    seeds: { type: Number, required: true },
    isUpside: { type: Boolean, required: true },
    growTime: { type: Number, required: true },
    image: { type: String, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('crops', Crop);