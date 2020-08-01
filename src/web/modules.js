function getModels(model) {
    return require(`../data/models/${model}-model`);
}

function getLogic(model) {
    return require(`../app/${model}`);
}

module.exports = { getModels, getLogic };