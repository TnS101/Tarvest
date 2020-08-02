function getModel(model) {
    return require(`../data/models${model}-mod`);
}
module.exports = { getModel: getModel };