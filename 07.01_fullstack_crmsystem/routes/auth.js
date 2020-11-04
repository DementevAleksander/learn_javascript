const express = require('express');
//сущность для создания роутов
const router = express.Router();

router.get('/login', (req, res) => {
    res.status(200).json({
        login: true
    })
})
//итог строки http://localhost:5000/api/auth/login



module.exports = router;
