import React, {useRef, useEffect, useState} from 'react';

function App() {

  const [value, setValue] = useState('initial')
  const renderCount = useRef(1) //renderCount - объект, у которого есть свойство current. Если мы хотим получить значение это ref, то нужно обращаться к current.
  useEffect(() => {
    renderCount.current++
  })

  return (
    <div>
      <h1>Количество рендеров: {renderCount.current}</h1>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
    </div>
  );
}

export default App;
