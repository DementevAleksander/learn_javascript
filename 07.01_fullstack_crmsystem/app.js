const express = require('express'); //Подключаем express
const authRoutes = require('./routes/auth')
//Создаём экземпляр express
const app = express();

//регистрируем routes, указываем url, который будет конотинироваться с url в routes
app.use('/api/auth', authRoutes)



module.exports = app;