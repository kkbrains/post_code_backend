
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Connect to Mongoose
//mongoose.connect('mongodb://localhost/pooltrackr');
mongoose.connect(config.database);
//mongoose.connect('mongodb://kk@brainsdesign.com:pooltrackrs@ds015325.mlab.com:15325/pooltrackr')
var db = mongoose.connection;
//Port number
const port = 3000;

const post_routes  = require('./routes/post_routes');
// Cors origin
app.use(cors());

//Set static folder
app.use('/logos', express.static(path.join(__dirname, "uploads")))
app.use(express.static(path.join(__dirname, "clients")));

// Body parser middle ware
app.use(bodyParser.json());



app.use('/api', post_routes);
//Index route
app.get("/", (req, res) => {
  res.send("Welcome to home page" + config.database);
});

app.listen(port, () => {
  console.log('running on port' + port);
});
