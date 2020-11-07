//Универсальная обработка ошибок
module.exports = (res, error) => {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error //error.message ? - есть ошибка, если есть, то обращаемся к полю error.message, иначе выдаём клиенту саму ошибку : error
  })
}