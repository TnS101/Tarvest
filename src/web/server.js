const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../data/context');

const route = require('./routes/main-router');
const movieRouter = route('movie');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Database connection error:'));

app.get('/', (req, res) => {
    res.send(`Something`);
});

app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use('/api', movieRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

function routes(models) {
    const routes = [];
    models.split(', ').reduce(function(acc, model) {
        result.push(route(model));
    }, 0);
    return routes;
}

function handlers(routes) {
    routes.reduce(function(acc, route) {
        app.use('/api', route);
    }, 0);
}