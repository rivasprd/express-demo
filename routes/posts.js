const express = require('express');
const router = express.Router();

router.get('/:year/:month', (req, res) => {
    res.send(req.params);
}) 

router.get('/:year/:month', (req, res) => {
    res.send(req.query); //query en vez de params para leer cosas como ?sortBy="name"
}) 

module.exports = router;