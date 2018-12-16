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
app.get('/api/alertyum/:id', call.alertNotification);


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});