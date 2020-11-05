const express = require('express');
const controller = require('../controllers/auth');
//сущность для создания роутов
const router = express.Router();

router.get('/login', controller.login) //итог строки http://localhost:5000/api/auth/login
router.get('/register', controller.register) //итог строки http://localhost:5000/api/auth/register


module.exports = router;
