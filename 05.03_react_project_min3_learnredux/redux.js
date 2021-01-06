const redux = require('redux')

const initialState = {
  counter: 0
}

// Reducer
const reducer = (state = initialState, action) => { //state - начальное состояние приложения. action - одно обязательное поле type.

  if (action.type === 'ADD') {
    return {
      counter: state.counter + 1
    }
  }

  if (action.type === 'SUB') {
    return {
      counter: state.counter - 1
    }
  }

  if (action.type === 'ADD_NUMBER') {
    return {
      counter: state.counter + action.value
    }
  }

  return state

}

// Store - место, где храняться все данные. Весь state описывается в одном javascript объекте.
const store = redux.createStore(reducer) //reducer - функция, делаящая преобразования.
console.log(store.getState())

store.subscribe(() => {
  console.log('Subscribe', store.getState())
}) // подписываемся на изменение store, когда что-то было обновлено.

// Actions
const addCounter = {
  type: 'ADD'
}

store.dispatch(addCounter)

store.dispatch({ type: 'SUB' })

store.dispatch({ type: 'ADD_NUMBER', value: 10 })
