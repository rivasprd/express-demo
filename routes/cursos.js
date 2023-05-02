const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'curso 1'},
    { id: 2, name: 'curso 2'},
    { id: 3, name: 'curso 3'},
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('El curso con ese ID no se ha encontrado');
    res.send(course);
}) 

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body); // {error} es lo mismo que hacer result.error
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

router.put('/:id', (req, res) => {
    //Buscar el curso
    //si no existe, tirar 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('El curso con ese ID no se ha encontrado'); 

    
    //Validar
    //si es invalido, tirar 400 - bad request
    //  const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // {error} es lo mismo que hacer result.error
    if(error) return res.status(400).send(error.details[0].message)

    //actualizar curso
    course.name = req.body.name;

    //devolver el curso actualizado
    res.send(course);

})

router.delete('/:id', (req, res) => {
    //Buscar el curso
    //Si no existe, devolver 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('El curso con ese ID no se ha encontrado');

    //Borrar el curso
    const index = courses.indexOf(course);
    courses.splice(index, 1)

    //Devolver el mismo cursos
    res.send(course);

})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;