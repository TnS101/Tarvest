function exe(modelName) {
    getModels = () => {
        return require(`../data/models/${modelName}-mod`);
    }

    getLogic = async(action, amount, res) => {
        let folder = '';

        if (modelName != 'user') {
            folder = 'game';
        } else if (modelName != 'comment' && modelName != 'topic') {
            folder = 'identity';
        } else {
            folder = 'social';
        }

        return modelName.includes('inventory') ? await require(`../app/${folder}/inventory-mod-man`).exe(modelName, action, Number(amount), res) : await require(`../app/${folder}/${modelName}-man`).exe(modelName, action, Number(amount), res);
    }

    return { getModels, getLogic };
}

module.exports = { exe };