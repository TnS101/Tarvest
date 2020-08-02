const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = new Schema({
    name: { type: String, required: true },
    onCraft: { type: { ingredients: [{ id: String, amount: Number }], cost: [{ type: String, amount: Number }], rewardId: String }, required: true },
    onDisolve: { type: { rewardType: String, amount: Number }, required: true },
    rank: { type: Number, required: true },
    xp: { type: Number, required: true },
    isUpside: { type: Boolean, required: true },
    element: { type: String, required: true },
    manaCost: { type: Number, required: true },
    isMajor: { type: Boolean, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('cards', Card);