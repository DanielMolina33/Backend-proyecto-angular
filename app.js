'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

//Cargar archivos de rutas

let projectRoutes = require('./routes/project');


//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas middleware

app.use('/api', projectRoutes);

//Exportar
module.exports = app;