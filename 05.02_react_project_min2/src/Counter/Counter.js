import React, { Component } from 'react'

export default class Counter extends Component {
    state = {
        counter: 0
    }

    addCounter = () => {
        // this.setState ({
        //     counter: this.state.counter + 1
        // })

        //Правильное изменение state. Защита от асинхронных изменений. Обращение к предыдущему состоянию state через параметр prevState
        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        })
    
    }
    
    render() {
        return (
            <div>
                <h2>Счёт: {this.state.counter}</h2>
                <button onClick={this.addCounter}>+</button>
                <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
                <hr/>
            </div>
        )
    }
}