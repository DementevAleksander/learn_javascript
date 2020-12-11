import React, { Component } from 'react';
import './App.css';
import Car from './Car/Car'

class App extends Component {

  state = {
    cars: [
      {name: 'Ford', year: 2018},
      {name: 'Audi', year: 2016},
      {name: 'Mazda', year: 2010}
    ],
    pageTitle: 'React components'
  }

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

  render() {
    // const cars = this.state.cars

    return (
      <div className="divStyle">
        {console.log("Render!")}
        <h1>{this.state.pageTitle}</h1>

        <input type="text" onChange={this.handleInput}></input>
        <br/>

        <button
          onClick={this.changeTitleHandler.bind(this, "Нажата кнопка 'Изменить заголовок'")}
        >Изменить заголовок</button>

        { this.state.cars.map((car, index) => {
          return (
            <Car
              key={index}
              name={car.name}
              year={car.year}
              onChangeTitlePage={() => this.changeTitleHandler(car.name)}
            />
          )
        }) }

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
