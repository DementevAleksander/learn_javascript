const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:5000/api/order?offset=2&limit=5. Означает, что мы забираем 5 элементов, offset показывает какой отступ нужно сделать(сколько элементов пропустить).
module.exports.getAll = async function(req, res) { //получаем список всех приёмов пищи, чтобы потом их отобразить на странице "История".
    const query = {
        user: req.user.id //конктретный пользователь.
    }
    
    // Дата старта
    if (req.query.start) { //если в query (поиск по истории по дате начала) будет параметр start
        query.date = { //добавляем в запрос query поле date
            $gte: req.query.start //$gte - Больше или равно req.query.start
        }
    }

    if (req.query.end) { //передаём дату конца и получем все приёмы пищи, у которых дата меньше или равна той дате, которую мы указали в поле на клиенте.
        if (!query.date) { //если в момент старта поле date не существует.
            query.date = {} //поле query.date является пустым объектом.
        }

        query.date['$lte'] = req.query.end //обращаемся к объекту query.date к ключу '$lte' (меньше или). В "меньше или" указываем значение конца.
    }
    
    if (req.query.order) { //если указали номер заказа.
        query.order = +req.query.order //в query.order кладём +req.query.order.
    }

    try {
        const orders = await Order
            .find(query) //query - описывает запрос
            .sort({date: -1}) //делаем сортировку по дате убывания
            .skip(+req.query.offset) //отображение информации при скролле. Сначала одно количество, прокрутили, показали ещё и т.д.
            .limit(+req.query.limit) //+ нужен для преобразования в число, иначе mongoose выдаст ошибку.

        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const lastOrder = await Order //Вытаскиваем номер последнего заказ, которые есть в БД.
          .findOne({user: req.user.id}) //находим все приёмы пищи, которые есть у пользователя.
          .sort({date: -1}) //сортируем по дате в порядке убывания. Таким оббразом мы получаем последний приём пищи по дате.
    
        const maxOrder = lastOrder ? lastOrder.order : 0 //если был найден последний заказ lastOrder, иначе maxOrder = 0.
    
        const order = await new Order({
          list: req.body.list, //различные позиции, которые входят в приём пищи
          user: req.user.id,
          order: maxOrder + 1
        }).save()
    
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}