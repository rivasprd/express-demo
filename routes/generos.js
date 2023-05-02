const express = require('express');
const router = express.Router();

const generos = [
    {id: 1, nombre: 'terror'},
    {id: 2, nombre: 'comedia'},
    {id: 3, nombre: 'accion'},
]

router.get('/', (req, res) => {
    res.send(generos)
})

router.get('/:nombre', (req, res) =>{
    const genero = generos.find(g => g.nombre === req.params.nombre);
    if (!genero) return res.status(404).send('No existe un genero con eel nombre ' + req.params.nombre);
    res.send(genero);
})

router.post('/', (req, res) => {
    const {error} = validarGenero(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genero = {
        id: generos.length + 1,
        nombre: req.body.nombre
    };
    generos.push(genero);
    res.send(genero)
})

router.put('/:nombre', (req, res) => {
    const genero = generos.find(g => g.nombre === req.params.nombre);
    if (!genero) return res.status(404).send('No existe un genero con el nombre ' + req.params.nombre);


    const {error} = validarGenero(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genero.nombre = req.body.nombre;

    res.send(genero);
})

router.delete('/:nombre', (req, res) => {
    const genero = generos.find(g => g.nombre === req.params.nombre);
    if (!genero) return res.status(404).send('No existe un genero con el nombre ' + req.params.nombre);

    const index = generos.indexOf(genero);
    generos.splice(index, 1)

    res.send(genero);
})

function validarGenero(genero) {
    const schema = {
        nombre: Joi.string().min(4).required()
    };

    return Joi.validate(genero, schema);
}

module.exports = router;