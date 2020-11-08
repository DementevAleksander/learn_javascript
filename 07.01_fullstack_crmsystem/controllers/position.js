const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {
    try {
        const positions = await Position.find({ //получаем все позиции
            //условия, по которым ищем позиции
            category: req.params.categoryId, //ищем только те категории, которые совпадают с ID категории.
            user: req.user.id //пользователь, который создал позицию.
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Position.remove({_id: req.params.id}) //передаём ID той позиции, которую мы хотим удалить. в запросе ожидаем, как параметр params. ID позиции.
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
      errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const position = await Position.findOneAndUpdate( //метод monggose .findOneAndUpdate - ищет определённую записи, обновляем её и возвращаем, как результат работы.
            {_id: req.params.id}, //условие, по которому ищем.
            {$set: req.body}, // $set - обращаемся к ключу, set - изменяем внутри данного объекта.
            {new: true} //Чтобы вернуть нужную запись. Обновит определённую запись в moongose и только после этого он её нам вернёт. Параметр обязательный, иначе мы получим запист до изменения.
        )
        res.status(200).json(position) //Возвращаем позицию.
    } catch (e) {
        errorHandler(res, e)
    }
}