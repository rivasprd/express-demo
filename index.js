const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan activado...');
}

dbDebugger('Conectado a la BBDD');

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => console.log(`Puerto ${puerto} activo`))