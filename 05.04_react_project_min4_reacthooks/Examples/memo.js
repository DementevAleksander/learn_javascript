import React, {useState, useMemo} from 'react';

function complexCompute(number) {
  console.log('complexCompute!')
  let i = 0
  while (i < 1000000000) i++
  return number * 2
}

function App() {

  const [number, setNumber] = useState(42)
  const [colored, setColored] = useState(false)
  const styles = {
    color: colored ? 'darkred' : 'black'
  }

  const computed = useMemo(() => {
    return complexCompute(number)
  }, [number])
  
  return (
    <div>
      <h1 style={styles}>Вычисляемое свойство: {computed}</h1>
      <button className={'btn btn-success'} onClick={() => setNumber(prev => prev + 1)}>Добавить</button>
      <button className={'btn btn-danger'} onClick={() => setNumber(prev => prev - 1)}>Убрать</button>
      <button className={'btn btn-warning'} onClick={() => setColored(prev => !prev)}>Изменить</button>
      {console.log('Повтор!')}
    </div>
  );
}

export default App;
