const mongoose = require('mongoose') //подключаем mongoose для создания моделей
const Schema = mongoose.Schema //схема, описывающая модель.

const categorySchema = new Schema({ //описываются поля
  name: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users', //ссыдка на коллекцию 'users' с юзерами
    type: Schema.Types.ObjectId //в качестве типа указывается определённый ID, который присутствует в moonguse и который автоматически генерируется для любого объекта
  }
})

module.exports = mongoose.model('categories', categorySchema) //'categories' - нужная таблица