import React from 'react'
import classes from './Layout.module.css'

class Layout extends React.Component {
    render() {
        return (
            <div className={classes.Layout}>
                {/* корневой div всего приложения. */}


                <main>
                    {/* Выводим весь контент, который складываем в тег Layout */}
                    {this.props.children}

                </main>
            </div>
        )
    }
}

export default Layout;