const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    coins: { type: Number, default: 100 },
    gems: { type: Number, default: 10 },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    xpCap: { type: Number, default: 100 },
    inventorySpace: { type: Number, default: 100 },
    landsIds: { type: [String], required: true },

}, { timestamps: true }, );

module.exports = mongoose.model('users', User);