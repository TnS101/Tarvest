function route(route) {
    const express = require('express');

    const controller = require('../controllers/main-controller')(route);
    const routeCC = `all${route.slice(0, 1).toLocaleUpperCase() + route.slice(1, route.length)}s`;
    const router = express.Router();

    router.post(`/${route}`, controller.create);

    router.put(`/${route}/:id`, controller.update);
    router.put(`/${route}/:id/:action/:amount`, controller.update);

    router.delete(`/${route}/:id`, controller.deleteE);
    router.delete(`/${route}/:id/:action/:amount`, controller.deleteE);

    router.get(`/${route}/:id`, controller.getSingle);
    router.get(`/${route}/name/:name`, controller.getSingle);

    router.get(`/${routeCC}`, controller.getMultiple);
    router.get(`/${routeCC}/:userId`, controller.getMultipleByUserId);
    router.get(`/${routeCC}/sort/:criteria/:order`, controller.getMultiple);
    router.get(`/${routeCC}/filter/:keyword/:value`, controller.getMultiple);
    router.get(`/${routeCC}/filter/:keyword/:value/order/:criteria/:order`, controller.getMultiple);
    router.get(`/${routeCC}/sort/:criteria/:order/filter/:keyword/:value`, controller.getMultiple);

    return router;
}

module.exports = route;