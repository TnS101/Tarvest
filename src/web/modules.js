function getModels(model) {
    return require(`../data/models/${model}-mod`);
}

function getLogic(model, action) {
    require(`../app/${model}/${model}-man`)(action);
}

module.exports = { getModels, getLogic };