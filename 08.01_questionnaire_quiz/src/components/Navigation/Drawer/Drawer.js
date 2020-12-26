import React, {Component} from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const links = [
    {to: '/', label: 'Список тестов', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-cleator', label: 'Создать тест', exact: false}
]

class Drawer extends Component {

    clickHandle = () => {
        this.props.onCloseFromLayout()
    }

    renderLinks() {
        return links.map((links, index) => {
            return (
                <li key={index}>
                   <NavLink
                    to={links.to}
                    exact={links.exact}
                    activeClassName={classes.active}
                    onClick={this.clickHandle}
                   >
                       {links.label}
                   </NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClickFromDrawer={this.props.onCloseFromLayout} /> : null}
                
            </React.Fragment>
        )
    }
}

export default Drawer;

