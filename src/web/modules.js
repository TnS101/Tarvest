function exe(modelName) {
    getModels = () => {
        return require(`../data/models/${modelName}-mod`);
    }

    getLogic = async(action, entity) => {
        let folder = '';

        if (modelName != 'user') {
            folder = 'game';
        } else if (modelName != 'comment' && modelName != 'topic') {
            folder = 'identity';
        } else {
            folder = 'social';
        }
        return await require(`../app/${folder}/${modelName}-man`)(action, entity);
    }

    return { getModels, getLogic };
}

module.exports = { exe };