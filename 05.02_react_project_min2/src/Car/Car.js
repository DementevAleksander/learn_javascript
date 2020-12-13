import React from 'react'
import './Car.css';

const Car = props => {
  const inputClasses = ['input']

  if (props.name !== '') {
    inputClasses.push('green')
  } else {
    inputClasses.push('red')
  }

  if (props.name.length > 5) {
    inputClasses.push('bold')
  }

  return (
    <div className="borderCar">
      <h3>Название машины: {props.name}</h3>
      <p>Year: <strong>{props.year}</strong></p>
      <input
        type="text"
        onChange={props.onChangeName}
        value={props.name}
        className={inputClasses.join(' ')}
      ></input>
      <button onClick={props.onDelete}>Удалить!</button>
    </div>
  )
}

export default Car;