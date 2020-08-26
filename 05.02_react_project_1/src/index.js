import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

const Elem = () => {
  return <h2>Привет, мир!</h2>
}

const App = () => {
  return (
    <div>
      <Elem/>
    </div>
  )
}

ReactDOM.render(

    <App/>,

  document.getElementById('root')
);
