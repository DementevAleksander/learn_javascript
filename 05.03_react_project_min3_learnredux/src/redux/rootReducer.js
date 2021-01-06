// // функции, изменяющие state
// const initialState = {
//   counter: 0
// }

// export default function rootReducer(state = initialState, action) {

//   switch(action.type) {
//     case 'ADD':
//       return {
//         counter: state.counter + 1
//       }
//     case 'SUB':
//       return {
//         counter: state.counter - 1
//       }
//     case 'AddNumber':
//       return {
//         counter: state.counter + 10
//       }
//     case 'ADD_NUMBER_VALUE':
//       return {
//         counter: state.counter + action.payload
//       }
//     default:
//       return state
//   }
// }

import {combineReducers} from 'redux'

import counter1 from './reducers/counter1'
import counter2 from './reducers/counter2'

export default combineReducers({
  counter1, counter2
})