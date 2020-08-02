function getModels(model) {
    return require(`../data/models/${model}-mod`);
}

function getLogic(model) {
    return require(`../app/${model}/${model}-man`);
}

module.exports = { getModels, getLogic };