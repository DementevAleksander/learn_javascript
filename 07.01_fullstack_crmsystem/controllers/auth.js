//Отвечает за логику авторизации при переключении роутов.

const bcrypt = require('bcryptjs') //Подключаем npm i bcryptjs для шифрования паролей
const jwt = require('jsonwebtoken') //npm i jsonwebtoken - пакет, который предоставляет токены клиенту
const User = require('../models/User') // Подкючаем модель пользователя
const keys = require('../config/keys') // Подкючаем секретный ключ для токена
const errorHandler = require('../utils/errorHandler') //подключаем функцию обработки ошибок.

module.exports.login = async function (req, res) {
    // res.status(200).json({
    //     login: {
    //         email: req.body.email, //req.body.email - вытягиваем значение переменной email, которое пришло на сервер.
    //         password: req.body.password
    //     }
    // })

    const candidate = await User.findOne({email: req.body.email}) //findOne() - найти запись, у которого email совпадает с req.body.email (поле, которое передаёт клиент).

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password) //.compareSync() - сравниваем пароли в синхронном режиме. req.body.password - передаём не хэшированный пароль, сравниваем с хэшированным паролем candidate.password.
        if (passwordResult) {
        // Генерация токена, пароли совпали
            const token = jwt.sign({ // при удачной авторизации клиент получает токен, который позволяет отправлять запросы к БД. sign() - авторизация. Первый параметр - объект, который шифруется в токене.
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60}) // keys.jwt - второй параметр секретный ключ, который позволит генерировать токен. Третий параметр {expiresIn: 60 * 60} - объект время действия токена (60*60 - 1 час)

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
        // Пароли не совпали
        res.status(401).json({
            message: 'Некорректный пароль. Попробуйте снова. Не торопитесь.'
        })
        }
    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
        message: 'Пользователь с таким email не найден!'
        })
    }
}

//Роуты для регистрации
module.exports.register = async function (req, res) {
    // res.status(200).json({
    //     register: 'Регистр'
    // })

    //Тестовая проверка сохранения записи в БД
            // const user = new User({
            //     email: req.body.email,
            //     password: req.body.password
            // })
            // user.save().then(() => console.log("Пользователь создан!"))

    // Отправляем даные, когда будем регистрироваться (email и password).
    // Проверяем, если такой email уже есть в базе, то выдаём ошибку.
    // Если email новый, то мы создаём новый пароль в зашифрованном виде.

    const candidate = await User.findOne({email: req.body.email}) //findOne() - найти запись, у которого email совпадает с req.body.email (поле, которое передаёт клиент).

    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({ //перечень статусов можно посмотреть на https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP
        message: 'Пользователь с таким email уже существует. Для регистрации используйте другой email.'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10) //уникальный хэш для пароля.
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt) //создаёт хэш нужного пароля, password - хэшируем
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            // Обработать ошибку
            errorHandler(res, e)
        }
    }
}