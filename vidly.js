const Joi = require('joi');
const expres = require('express');
const app = expres();
const generos = require('./routes/generos');

app.use(expres.json());
app.use('/api/generos', generos);

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => console.log(`Puerto ${puerto} activo`));