const express = require('express') //Подключаем express
const mongoose = require('mongoose') //фреймвор mogoose, который работает (общается) с БД MongoDB
const passport = require('passport') //Простая ненавязчивая аутентификация для Node.js

const bodyParser = require('body-parser') //Подключаем пакет body-parser. дополнительный пакет, который парсит данные для считывания экспрессом, которые приходят от пользователя
const cors = require('cors') //пакет предназначен для обработки cors запросов, например, если клиент находится на другом домене, то мы всё равно сможем отвечать нашим сервером.
const morgan = require('morgan') //более красиво логирует определённые запросы и смотреть, что происходит с сервером в данный момент

const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const app = express(); //Создаём экземпляр express

//Подключаемся к БД MongoDB
mongoose.connect(keys.mongoURI)
    .then(() => console.log('БД MongoDB подключена!'))
    .catch(error => console.log(error))


// use() - используем дополнительный плагин
app.use(passport.initialize())
require('./middleware/passport')(passport) //подключаем файл, в котором описываем логику и защиту роутов.

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads')) //когда мы обращаемся к папку /uploads, то с помощью express.static('uploads') делаем папку статической и передаём параметр uploads. Это дасть возможность получать доступ к картинкам напрямую (это нужно для загрузки картинок из БД на клиент).
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json()) //генерирует json объекты из объектов javascript
app.use(cors())

//регистрируем routes, указываем url, который будет конотинироваться с url в routes
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app;