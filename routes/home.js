const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Mi app en Express', message: 'Holis'});
})

module.exports = router;