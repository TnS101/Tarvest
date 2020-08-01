function getModels(model) {
    return require(`../data/models/${model}-model`);
}

module.exports = { getModels };