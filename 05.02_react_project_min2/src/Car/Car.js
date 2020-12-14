import React from 'react'
import './Car.css';

//Создание statefull компонента. Необходимо, чтобы во вновь созданных компонентах можно было использовать жизненные циклы ReactJS.
class Car extends React.Component {

  // Жизненные циклы компонента. Порядо вызова
  // shouldComponentUpdate() {}
  // render() {}
  // componentDidUpdate() {}

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate() {} из car.js', nextProps, nextState)
    return nextProps.name.trim() !== this.props.name.trim() //проверка - если пробел, то заново компонент не отрисовываем.
  } // true - значит компонент должен измениться и мы должны его перерисовать, но если мы сделаем проверку и будет возвращено false данный компонент не нужно перерисовывать.

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   console.log('getDerivedStateFromProps() {} из car.js', nextProps, prevState)
  //   return prevState
  // }

  // getSnapshotBeforeUpdate() {
  //   console.log('getSnapshotBeforeUpdate() {} из car.js')
  // } //метод позволяет получить не изменённое DOM-дерево до обновления. Вызывается после render() {}.

  componentDidUpdate() {
    console.log('componentDidUpdate() {} из car.js')
  } //вызывается после shouldComponentUpdate() {} и render() {}. Если shouldComponentUpdate() {} не отрисовывет изменённый компонент, то componentDidUpdate() {} Не вызывается.

  componentWillUnmount() {
    console.log("componentWillUnmount() {} из car.js")
  } //Жизненный цикл удаления. Вызывается после того, как компонент был удалён из DOM-дерева.

  render() {
    // Если shouldComponentUpdate() {} не отрисовывет изменённый компонент, то render() {} Не вызывается.
    console.log("render() {} из car.js")
    const inputClasses = ['input']

    if (this.props.name !== '') {
      inputClasses.push('green')
    } else {
      inputClasses.push('red')
    }
  
    if (this.props.name.length > 5) {
      inputClasses.push('bold')
    }
  
    return (
      <div className="borderCar">
        <h3>Название машины: {this.props.name}</h3>
        <p>Year: <strong>{this.props.year}</strong></p>
        <input
          type="text"
          onChange={this.props.onChangeName}
          value={this.props.name}
          className={inputClasses.join(' ')}
        ></input>
        <button onClick={this.props.onDelete}>Удалить!</button>
      </div>
    )
  }
}

export default Car;