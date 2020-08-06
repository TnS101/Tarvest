const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolInventory = new Schema({
    userId: { type: String, required: true },
    toolId: { type: String, required: true },
    durability: { type: Number, required: true },
    count: { type: Number, default: 1 },
}, { timestamps: true }, );

module.exports = mongoose.model('toolsInventories', ToolInventory);