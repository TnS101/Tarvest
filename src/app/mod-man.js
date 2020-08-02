const { json } = require("body-parser");

async function getMod(query, Mod) {
    await Mod.findOne(query, (model) => {
        return model;
    });
}

function updateMod(model, args) {
    for (const key in model) {
        if (model.hasOwnProperty(args[i].key)) {
            model[key] = args[i].val;
        }
    }
    model.save();
}

module.exports = { getMod, updateMod };