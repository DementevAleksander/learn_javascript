const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true //mondoose проверяет, если в БД есть такой пользователь с таким емейлом, то у нас будет ошибка (уникальный емайл во всей системе)
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', userSchema)