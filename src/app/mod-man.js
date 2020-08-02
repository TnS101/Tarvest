async function getMod(query, Mod) {
    await Mod.findOne(query, (err, model) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!model) {
            return res
                .status(404)
                .json({ success: false, error: 'Model not found' });
        }
        return model;
    }).catch(err => console.log(err));
}

function updateMod(model, args) {
    for (const key in model) {
        if (model.hasOwnProperty(args[i].key)) {
            model[key] = args[i].val;
        }
    }
    model.save();
}

module.exports = { getMod: getMod, updateMod: updateMod };