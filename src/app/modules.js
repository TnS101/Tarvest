function getModel(models) {
    models.reduce(function(acc, curr) {
        module.exports[curr] = require(`../data/models${curr}-mod`);
    }, 0);
}