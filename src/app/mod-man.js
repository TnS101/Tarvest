function exe() {
    getMod = async(query, Mod) => {
        const result = await Mod.findOne(query, (err, model) => {
            return model;
        });
        return result;
    }

    updateMod = (model, args) => {
        for (const key in model) {
            if (model.hasOwnProperty(args[i].key)) {
                model[key] = args[i].val;
            }
        }
        model.save();
    }

    return { getMod, updateMod };
}

module.exports = { exe };