import React, {Component} from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

class Drawer extends Component {

    clickHandle = () => {
        this.props.onCloseFromLayout()
    }

    renderLinks(links) {
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

        const links = [
            {to: '/', label: 'Список', exact: true}
        ]
    
        // console.log('AUth', this.props.isAuthenticated)
    
        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClickFromDrawer={this.props.onCloseFromLayout} /> : null}
                
            </React.Fragment>
        )
    }
}

export default Drawer;

