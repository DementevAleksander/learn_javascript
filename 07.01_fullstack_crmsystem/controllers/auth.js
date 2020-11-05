//Отвечает за логику авторизации при переключении роутов.
//Некоторые функции которые выполняются в зависимости от routes.
module.exports.login = function (req, res) {
    res.status(200).json({
        login: 'Логин контроллер'
    })
}

//Роуты для регистрации
module.exports.register = function (req, res) {
    res.status(200).json({
        register: 'Регистр'
    })
}