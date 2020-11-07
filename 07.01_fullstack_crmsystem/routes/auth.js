const express = require('express'); // подключение express
const controller = require('../controllers/auth'); // подключение логики из controllers
const router = express.Router(); //сущность для создания роутов

router.post('/login', controller.login) //итог строки http://localhost:5000/api/auth/login
router.post('/register', controller.register) //итог строки http://localhost:5000/api/auth/register


module.exports = router;
