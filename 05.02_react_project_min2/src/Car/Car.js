import React from 'react'
import './Car.css';

const Car = props => (
  <div className="borderCar">
    <h3>Сar name: {props.name}</h3>
    <p>Year: <strong>{props.year}</strong></p>
    <button onClick={props.onChangeTitlePage}>Нажми!</button>
  </div>
)

export default Car;