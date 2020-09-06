import React, {Component} from 'react';

class WhoAmI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: 26
        }
        //Привязываем обработчик события к экземпляру объекта.
        this.nextYear = this.nextYear.bind(this); //Первый способ.
        // this.nextYear = () => { //Второй способ. В таком случае nextYear(){}, указанная ниже, приписывать не нужно.
        //     this.setState(state => ({
        //         years: ++state.years
        //     }))
        // } // По сути это и есть третий способ (ES9), который можно записывать вне конструктора.
    }

    nextYear() {
        console.log(1);
        // this.state.years++ //Напрямую менять нельзя, использовать метод setState().
        this.setState(state => ({
            years: ++state.years
        }))
    }

    render() {
        const {name, surname, link} = this.props;
        const {years} = this.state;
        return (
            <>
                <h5>
                    Меня зовут <b>{name}</b> по фамилии <b>{surname}, </b>
                    лет мне <b>{years}</b>
                </h5>
                <button onClick={this.nextYear}>Добавить</button>
                <br></br>
                <a href={link}>Ссылка где найдётся всё - {link}</a>
            </>
        )
    }
}

// function WhoAmI(props) {
//         return (
//             <>
//                 <h1>Меня зовут {props.name} по фамилии {props.surname}, лет мне Саша </h1>
//                 <a href={props.link}>Ссылка где найдётся всё - {props.link}</a>
//             </>
//     )
// }

const WhoAmIAll = () => {
    return (
        <>
            <WhoAmI name="Саша" surname="Александров" link="https://yandex.ru" />
            <WhoAmI name="Настя" surname="Анастасиева" link="https://yandex.ru" />
        </>
    )
}

export default WhoAmIAll;