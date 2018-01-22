const app = require('express')();
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use("/", routes);

app.use(errorhandler());

app.listen(3000, () => {
    process.stdout.write('Server Online...\n');
});