const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CrateInventory = new Schema({
    userId: { type: String, required: true },
    crateId: { type: String, required: true },
    onOpen: { type: { itemRewards: [{ id: String, amount: Number }], valueRewards: [{ type: String, amount: Number }] }, required: true },
    count: { type: Number, default: 1 },
}, { timestamps: true }, );

module.exports = mongoose.model('cratesInventories', CrateInventory);