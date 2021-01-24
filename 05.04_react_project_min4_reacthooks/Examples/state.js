import React, {useState} from 'react';

function App() {

  const [counter, setCounter] = useState(100) // 1 - сам state, 2 - функция, которая отслеживает, что state изменился.
  console.log(counter, setCounter)

  function increment() {
    // setCounter(counter + 1) //вызываем функцию изменения state
    setCounter((prevCounter) => { //получаем предыдущее состояние state.
      return prevCounter + 1
    })
    setCounter(prevCounter => prevCounter + 1) //тоже самое, что и в предыдущем вызове setCounter()

  }

  function decrement() {
    setCounter(counter - 1) //вызываем функцию изменения state
  }

  return (
    <div>
      <h1>Счётчик: {counter}</h1>
      <button onClick={increment} className="btn btn-success">Добавить</button>
      <button onClick={decrement} className="btn btn-danger">Убрать</button>
    </div>
  );
}

export default App;
