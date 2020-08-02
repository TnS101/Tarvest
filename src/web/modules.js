function getModels(model) {
    return require(`../data/models/${model}-mod`);
}

function getLogic(model, action) {
    let foulder = '';

    if (model != 'user') {
        foulder = 'game';
    } else if (model != 'comment' && model != 'topic') {
        foulder = 'identity';
    } else {
        foulder = 'social';
    }

    require(`../app/${foulder}/${model}-man`)(action);
}

module.exports = { getModels, getLogic };