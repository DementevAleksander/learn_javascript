import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; //Навигация по вкладкам
import {createStore, compose, applyMiddleware} from 'redux' //compose - для отладки.
import {Provider} from 'react-redux' //для работы redux в приложении.
import rootReducer from './store/reducers/rootReducer' //объединяем все существующие Reducer
import thunk from 'redux-thunk' //асинхронное изменение state

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const store = createStore(
  rootReducer, //тут собраны все редюсеры
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
