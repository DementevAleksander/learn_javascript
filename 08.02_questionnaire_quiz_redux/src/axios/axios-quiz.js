import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-2cf52-default-rtdb.firebaseio.com/'
})