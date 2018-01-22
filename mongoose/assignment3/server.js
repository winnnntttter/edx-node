const express       =  require("express");
const logger        =  require("morgan");
const errorhandler  =  require("errorhandler");
const bodyParser    =  require("body-parser");
const mongoose      =  require("mongoose");
const app           =  express();
const config        =  require("./config/config");
const routes        =  require("./config/routes");

mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

app.use('/', routes);
app.listen(config.port, () => console.log(`Express has started on port: ${config.port}`));
