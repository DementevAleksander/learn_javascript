// Отвечает за загрузку файлов
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({ //конфигурируем местоположение файлов, как они будут загружаться, где они будут храниться.
  destination(req, file, cb) {
    cb(null, 'uploads/') //колбек функция, которая выполняется после завершения. null - нет ошибок. uploads/ - папка, куда складываются картинки.
  },
  filename(req, file, cb) {
    const date = moment().format('YYYYMMDD-HHmmss_SSS') //преобразовываем название файла. Милисекунды нужны, чтобы название файла было оригинальное и не было ошибок, если пользователи сохраняют одновременно файлы.
    cb(null, `${date}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') { //проверяем, является ли файл картинкой.
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}


module.exports = multer({storage, fileFilter, limits})