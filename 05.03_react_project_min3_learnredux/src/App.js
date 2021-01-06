import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux'; //связывает store
import Counter from './Counter';
import {add, addNumber, addNamberValue, sub, asyncAdd} from './redux/actions/actions';

class App extends Component {

  // updateCounter(value) {
  //   this.setState({
  //     counter: this.state.counter + value
  //   })
  // }

  render() {
    console.log("APP", this.props)
    return (
      <div className="App">
        <h1>Счетчик <strong>{this.props.propsCounter}</strong></h1>

        <hr/>

        <div className="Actions">
          <button onClick={this.props.onAdd}>Добавить 1</button>
          <button onClick={this.props.onSub}>Вычесть 1</button>
          <button onClick={this.props.onAddNumber}>Добавить 10</button>
        </div>

        <div className="Actions">
          <button onClick={() => this.props.onAddNumberValue(20)}>Добавить 20</button>
          <button onClick={() => this.props.onAddNumberValue(-100)}>Вычесть 100</button>
        </div>

        <div className="Actions">
          <button onClick={() => this.props.onAsyncAdd(100)}>Асинхронно добавить 100</button>
        </div>

        <Counter />

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    propsCounter: state.counter1.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(add()),
    onSub: () => dispatch(sub()),
    onAddNumber: () => dispatch(addNumber()),
    onAddNumberValue: number => dispatch(addNamberValue(number)),
    onAsyncAdd: number => dispatch(asyncAdd(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) //вызываем функцию, которая возвращает результат в виде функции, в этот результат кладём компонент.
