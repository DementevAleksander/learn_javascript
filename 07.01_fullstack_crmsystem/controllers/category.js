const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const categories = await Category.find({user: req.user.id}) //при условии, что категории создал текущий пользователь. ID получаем из ссылки, которая придёт от клиента (логика ссылок описана в роутах).
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id}) //Удаляя категорию, мы удаляем все позиции, саязанные с нею. Чтобы база была чище.
        res.status(200).json({
            message: 'Категория удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : '' //путь к файлу. Если в req.file ? что либо есть, то добавляем в переменную category путь до этого файла, иначе добавляем пусту строку.
    })

    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name //получаем данные от клиента и записываем в переменную updated.
    }

    if (req.file) { //если в req есть file
        updated.imageSrc = req.file.path //объект updated поле imageSrc (которое совпадает с ключами в модели) равняется полученному пути.
    }

    try {
        const category = await Category.findOneAndUpdate( //обращаемся к модели Category
            {_id: req.params.id}, //находим нужную категорию по ИД. Берём из роутов.
            {$set: updated}, //Меняем категорию на данные, которые пришли в запросе.
            {new: true} //меняем категорию, потом получаем.
        )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}