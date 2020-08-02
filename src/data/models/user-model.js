const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    coins: { type: Number, required: true },
    gems: { type: Number, required: true },
    level: { type: Number, required: true },
    xp: { type: Number, required: true },
    xpCap: { type: Number, required: true },
    inventorySpace: { type: Number, required: true },
    lands: { type: [{ landId: String }], required: true },

}, { timestamps: true }, );

module.exports = mongoose.model('users', User);