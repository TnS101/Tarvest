function exe(model) {
    const Entity = require('../common').getModels(model);

    const entityName = model.slice(0, 1).toLocaleUpperCase() + model.slice(1, model.length);
    create = (req, res) => {
        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: `You must provide a ${entityName}`,
            })
        }
        const entity = new Entity(body);

        if (!entity) {
            return res.status(400).json({ success: false, error: err })
        }

        entity
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: entity._id,
                    message: `${entityName} created!`,
                })
            })
            .catch(error => {
                return res.status(400).json({
                    body: entity,
                    error,
                    message: `${entityName} not created!`,
                })
            })
    }

    update = async(req, res) => {
        const body = Object.assign({}, req.body)

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update',
            })
        }

        Entity.findOne({ _id: req.params.id }, (err, entity) => {
            if (err) {
                return arr.status(404).json({
                    err,
                    message: `${entityName} not found!`,
                })
            }

            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    entity[key] = body[key];
                }
            }

            entity
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: entity._id,
                        message: `${entityName} updated!`,
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: `${entityName} not updated!`,
                    })
                })
        })
    }

    deleteE = async(req, res) => {
        await Entity.findOneAndDelete({ _id: req.params.id }, (err, entity) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!entity) {
                return res
                    .status(404)
                    .json({ success: false, error: `${entityName} not found` })
            }

            return res.status(200).json({ success: true, data: entity })
        }).catch(err => console.log(err))
    }

    getSingle = async(req, res) => {
        await Entity.findOne({ _id: req.params.id }, (err, entity) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            if (!entity) {
                return res
                    .status(404)
                    .json({ success: false, error: `${entityName} not found` })
            }
            return res.status(200).json({ success: true, data: entity })
        }).catch(err => console.log(err))
    }

    getMultiple = async(req, res) => {
        await Entity.find({}, (err, entities) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!entities.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `${entityName} not found` })
            }
            return res.status(200).json({ success: true, data: mutate(entities, req.params.keyword, req.params.value, req.params.criteria, req.params.order) })
        }).catch(err => console.log(err))
    }
    return { create, update, deleteE, getSingle, getMultiple }
}

module.exports = exe;

function mutate(data, keyword, value, criteria, order) {

    function pSet(obj, input) {
        for (const key in obj) {
            if (key === input) {
                return obj[key];
            }
        }
    }

    if (keyword && value) data = data.filter(e => pSet(e, keyword) > value);

    if (criteria && order) {
        if (order == 'dsc') {
            return data.sort((b, a) => pSet(a, criteria) - pSet(b, criteria));
        } else {
            return data.sort((a, b) => pSet(a, criteria) - pSet(b, criteria));
        }
    }

    return data;
}