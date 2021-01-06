import {ADD, ADD2, AddNumber, ADD_NUMBER_VALUE, SUB} from './actionTypes'

export function add() {
  return {
    type: ADD
  }
}

export function sub() {
  return {
    type: SUB
  }
}

export function addNumber(number) {
  return {
    type: AddNumber,
    payload: number
  }
}

export function addNamberValue(number) {
  return {
    type: ADD_NUMBER_VALUE,
    payload: number
  }
}

export function asyncAdd(number) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addNamberValue(number))
    }, 3000)
  }
}

export function add2(number) {
  return {
    type: ADD2,
    payload: number
  }
}