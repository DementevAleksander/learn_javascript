import React from "react"

export default class ErrorBoundary extends React.Component {
    //Обработка ошибок
    state = {
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({hasError:true})
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{color: "red"}}>Произошла непредвиденная ошибка! Бегите!!!!</h1>
        }

        return this.props.children
    }
}