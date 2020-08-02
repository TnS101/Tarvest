const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropInventory = new Schema({
    userId: { type: String, required: true },
    cropId: { type: String, required: true },
    count: { type: Number, required: true },
}, { timestamps: true }, );

module.exports = mongoose.model('cropsInventories', CropInventory);