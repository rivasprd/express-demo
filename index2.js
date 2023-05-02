const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express');
const res = require('express/lib/response');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const cursos = require('./routes/cursos');
const home = require('./routes/home');
const posts = require('./routes/posts');
//const res = require('express/lib/response');
const app = express();

app.set('view engine', 'pug');
//app.set('views', './views'); // este es el default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true})); //
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', cursos);
app.use('/', home);
app.use('/api/posts/', posts);

// Configuration
console.log('Nombre de la app: ' + config.get('name'));
console.log('Servidor de mail: ' + config.get('mail.host'));
console.log('Contraseña de mail: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan activado...');
}

app.use(logger);
app.use(auth);


// declaramos una constante para usar la variable de entorno definida para el
// puerto. En caso de no existir, usamos el puerto 3000
const puerto = process.env.PORT || 3000;

app.listen(puerto, () => console.log(`Puerto ${puerto} activo`))
// app.post()
// app.put()
// app.delete()


/*

*/ 