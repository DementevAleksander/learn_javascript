import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
// import axios from 'axios';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/auth';

class Auth extends Component {

    state = {
        isFormValid: false, //валидация всей формы, чтобы не отправляли незаполненную
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false, // отвечает за проверку было ли затронуто поле
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false, // отвечает за проверку было ли затронуто поле
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHanler = () => {

        // console.log("this.props.errorDataUserView:", this.props.errorDataUserView === "AUTH_ERROR")

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHanler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )       
    }

    submitHanler = (event) => {
        event.preventDefault()
    }

    vaidateControle(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid // && isValid - проверяет, что isValid тоже в true
            // console.log(isValid)
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
            // console.log(isValid)
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
            // console.log(isValid)
        }

        // console.log("isValid:", isValid)

        return isValid

    }

    onChangeHandler = (event, controlName) => {
        // получаем данные от пользователя, затем меняем state
        // console.log(`${controlName}: `, event.target.value)

        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }
        control.value = event.target.value
        control.touched = true //пользователь уже что-то ввёл
        control.valid = this.vaidateControle(control.value, control.validation) //проверяем, валидный ли контрол
        
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid //isFormValid = true
        })
        
        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Войдите в систему</h1>

                    <form onSubmit={this.submitHanler} className={classes.AuthForm}>

                        { this.props.errorDataUserView === "AUTH_ERROR"
                            ? <span>Ошибка! Проверьте логин и пароль и повторите попытку!</span>
                            : null
                        }

                        {/* делаем отдельную функцию, которая рендерит input */}
                        { this.renderInputs() }

                        <Button
                            type="success"
                            onClick={this.loginHanler}
                            disabled={!this.state.isFormValid}                        
                        >
                            {/* {console.log("this.state.isFormValid:", !this.state.isFormValid)} */}
                            Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHanler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorDataUserView: state.auth.errorDataUserView
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Auth)