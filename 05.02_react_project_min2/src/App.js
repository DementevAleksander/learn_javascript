import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from './Counter/Counter'
import About from './About/About'
import {Route} from 'react-router-dom'

class App extends Component {

  constructor(props) {
    // constructor() {} - вызывается первым при создании реакт компонентов.
    console.log("constructor() {}")
    super(props)
    this.state = {
      cars: [
        {name: 'Ford', year: 2018},
        {name: 'Audi', year: 2016},
        {name: 'Mazda', year: 2010}
      ],
      pageTitle: 'React components',
      showCars: true
    }
}

  // state = {
  //   cars: [
  //     {name: 'Ford', year: 2018},
  //     {name: 'Audi', year: 2016},
  //     {name: 'Mazda', year: 2010}
  //   ],
  //   pageTitle: 'React components',
  //   showCars: true
  // }

  changeTitleHandler = (newTitle) => {

    this.setState({
      pageTitle: newTitle
    })

    // const oldTitle = this.state.pageTitle; //получаем старое состояние
    // const newTitle = oldTitle + '+ изменённое название!';

    // this.setState({
    //   pageTitle: newTitle
    // })
  }

  handleInput = (event) => {
    // console.log("Изменено!", event.target.value)
    this.setState({
      pageTitle: event.target.value
    })
  }

  toggleCarsHandler = () => {
    // console.log("Изменено!", event.target.value)
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(inputText, index) {
    // console.log(inputText, index)
    const carNew = this.state.cars[index] // по индексу нашли строку с машиной, с которой работаем, сохранили в переменную carNew.
    // console.log(carNew, index)
    carNew.name = inputText // присвоили полю name, то значение, которое ввели руками в поле ввода.
    // console.log(carNew, index, carNew.name)

    //теперь нужно изменить машину в исходном массиве cars, находящийся в state
    const carsNewArray = [...this.state.cars] //клон массива car, находящийся в state
    carsNewArray[index] = carNew //теперь изменям массив carsNewArray, находим номер записи по индексу, записываем получившуюся строку с новым именем машины в новый массив в соответсвующий индекс, с которвм работали.
    this.setState({
      cars: carsNewArray //перезаписываем массив cars, находящийся в state.
    })
  }

  deleteHandler(index) {
    const carsNewArray = [...this.state.cars]
    carsNewArray.splice(index, 1) //удаляем один элемент
    // const carsNewArrayModified = carsNewArray
    // this.setState({
    //   cars: carsNewArrayModified
    // })
    this.setState({
      cars: carsNewArray
    })
  }

  //Базовые жизненные циклы ReactJS
  // componentWillMount() {} - устарел.
  // render() {} - вызывается вторым. Перезапускается каждый раз, когда меняется state.
  // componentDidMount() {} - Вызывается третьим.
  
  // componentWillMount() {
  //   console.log("Приложение componentWillMount() {}")
  // }

  componentDidMount() {
    console.log("Приложение componentDidMount() {}")
  }

  render() {
    console.log("render() {}")

    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
            <Car
              name={car.name}
              year={car.year}
              // onChangeTitlePage={() => this.changeTitleHandler(car.name)}
              onChangeName={(event) => this.onChangeName(event.target.value, index)}
              onDelete={this.deleteHandler.bind(this, index)} //this - текущий контекст.
            />
          </ErrorBoundary>
        )
      })
    }

    return (
      <div className="divStyle">

        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
        
        <hr/>
        <Route path="/" exact render={() => <h1>Домашняя страница</h1>} /> 


        <About />

        <h1>{this.state.pageTitle}</h1>

        <Counter/>
        <br/>

        <input type="text" onChange={this.handleInput}></input>
        <br/>

        <button className="button"
          onClick={this.changeTitleHandler.bind(this, "Нажата кнопка 'Изменить заголовок'")}
        >Изменить заголовок</button>
        <br/>
        <button className="button"
          onClick={this.toggleCarsHandler}
        >Показать/скрыть машины</button>
        <p>_______</p>

        { cars }

        {/* <Car
          name={cars[0].name}
          year={cars[0].year}
          onChangeTitlePage={this.changeTitleHandler.bind(this, "Нажата кнопка 'Нажми!'")}
        />
        <Car
          name={cars[1].name}
          year={cars[1].year}
        />
        <Car
          name={cars[2].name}
          year={cars[2].year}
        /> */}
      </div>
    );
  }
}

export default App;
