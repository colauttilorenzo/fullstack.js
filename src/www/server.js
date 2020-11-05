const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());

const _port = 4200;
const _app_folder = './dist/www';

app.use(express.static(_app_folder));

app.all('*', function (req, res) {
    res.status(200).sendFile('/', { root: _app_folder });
});

app.listen(_port, function () {
    console.log('' + app.name + ' listening on http://localhost:' + _port);
});