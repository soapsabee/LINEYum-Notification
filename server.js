var express = require('express');
var cors = require('cors')
var app = express();
var call = require('./Alert_service')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.get('/api/alertNotificaiton/:id',call.checkDataOnFirebase);



