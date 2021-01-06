import {ADD, AddNumber, ADD_NUMBER_VALUE, SUB} from '../actions/actionTypes'

const initialState = {
  counter: 0
}

export default function counter1(state = initialState, action) {
  switch(action.type) {
    case ADD:
      return {
        counter: state.counter + 1
      }
    case SUB:
      return {
        counter: state.counter - 1
      }
    case AddNumber:
      return {
        counter: state.counter + 10
      }
    case ADD_NUMBER_VALUE:
      return {
        counter: state.counter + action.payload
      }
    default:
      return state
  }
}