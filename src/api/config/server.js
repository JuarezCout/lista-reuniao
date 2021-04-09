
import express from 'express'
const port = 4000;
//BODY parse of requistion
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import DB Connection
require("./database");

// Import API route
const routes = require('../routes/lista'); //importing route
routes(app);
app.use('/listas', routes)


app.listen(process.env.PORT || port, function () {
  console.log('Listening on ' + port);
});

module.exports = app