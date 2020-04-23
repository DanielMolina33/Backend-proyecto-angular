'use strict'

let mongoose = require('mongoose');
let app = require('./app');
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.set('port', process.env.PORT || 3000);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://josedanielmolina:cqsielptduslmple33@first-app-3zttj.mongodb.net/portafolio')
.then(() =>{
    console.log('Conexion a la base de datos establecida con exito');
    //Crear el servidor
    app.listen(app.get('port'), () =>{
        console.log('Servidor corriendo correctamente en la url localhost:' + app.get('port'));
    });
})
.catch(error =>{
    console.log(error);
})
