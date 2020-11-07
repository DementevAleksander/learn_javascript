const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')

const options = { //генерируем объект опций, который будет использоваться при работе с данной стртегией (passport-jwt). Подробнее про стратегии смотри тут - http://www.passportjs.org/packages/
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //говорим стратегии о том, что мы будем брать токен, который будет находитьс в хедарах.
  secretOrKey: keys.jwt
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => { //паспортк добавляем новую стратегию. options - те опции, которые мы сгенерировали. Вторым параметрам передаётся колбек функция.
      try {
        const user = await User.findById(payload.userId).select('email id') //ищем пользователя в БД в зависимости от токена, который получаем. userId берётся из токена, который прописан в auth.js

        if (user) {
          done(null, user) //первый параметр - ошибка, в данном случае указываем просто null, вторым параметром передаются те данные, которые нам нужны.
        } else {
          //если не нашли пользователя
          done(null, false) //запрещаем передавать данные к запросам от клиента
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}