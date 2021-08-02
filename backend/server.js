//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const cors = require('cors');
const path = require('path');


//instantiate server

var server = express();


server.use(cors())

//Body Parser Configuration

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// configure routes

server.get('/', function (req, res) {

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour</hi>');


});
server.use('/api/', apiRouter);
server.use('/images', express.static(path.join(__dirname, 'images')));


//Launch server
server.listen(8080, function () {

    console.log('Serveur en écoute')

});