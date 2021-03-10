import React, {Component} from 'react';
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
// import axios from '../../axios/axios-quiz';
import {connect} from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

function createOptionControl(number) {
    return createControl({
      label: `Вариант ответа ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number
    }, {required: true})
  }

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        },
        {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        nameQuizTest: createControl({
            label: 'Введите название теста',
            errorMessage: 'Название не может быть пустым'
        },
        {
            required: true
        }),
        isFinishCreateQuiz: false,
        lengthNameQuiz: 50
    }

    sibmitHandler = event => {
        event.preventDefault()
    }
    
    addQuestionHandler = (event) => {
        event.preventDefault()
    
        const {question, option1, option2, option3, option4} = this.state.formControls 
    
        const questionItem = { //формируем объект из вопросов, который кладём в state
            nameQuizTest: this.state.nameQuizTest.value,
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        
        // console.log(questionItem)
    
        this.props.createQuizQuestion(questionItem)
    
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = (event) => {
        event.preventDefault()

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
            nameQuizTest: '',
            isFinishCreateQuiz: true
        })
        this.props.finishCreateQuiz()
    }

    changeHandlerNameTest = (value) => {

        let nameQuiz = { ...this.state.nameQuizTest }
        const control = { ...nameQuiz }
    
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
    
        nameQuiz = control



        this.setState({
            nameQuizTest: nameQuiz,
            lengthNameQuiz: 50 - control.value.length
        })
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
    
        formControls[controlName] = control
    
        this.setState({
          formControls: formControls,
          isFormValid: validateForm(formControls)
        })
      }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
            <Auxiliary key={controlName + index}>
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation} //!! - приводим к булеан типу true или false.
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />
                { index === 0 ? <hr /> : null }
            </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState ({
            rightAnswerId: +event.target.value
        })
    }

    render() {

        const select = <Select
            label="Выберите правильный ответ!"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        if (this.props.isAuthenticated) {
            return (
                <div className={classes.QuizCreator}>
                    <div>
                        <h1>Создание теста</h1>

                        {
                            this.state.isFinishCreateQuiz
                            ? <h1>Тест создан и отображается в общем списке тестов. Спасибо за участие!</h1>
                            :
                            <form onSubmit={this.submitHandler}>

                                <Input
                                    label={`Введите название теста (не более ${this.state.lengthNameQuiz} символов)`}
                                    // value={this.state.nameQuizTest.value}
                                    valid={this.state.nameQuizTest.valid}
                                    shouldValidate={!!this.state.nameQuizTest.validation} //!! - приводим к булеан типу true или false.
                                    touched={this.state.nameQuizTest.touched}
                                    errorMessage={this.state.nameQuizTest.errorMessage}
                                    maxLength={50}
                                    onChange={event => this.changeHandlerNameTest(event.target.value)}
                                    disabled={this.props.quiz.length > 0}
                                />

                                { this.renderControls() }

                                { select }

                                <Button
                                    type="primary"
                                    onClick={this.addQuestionHandler}
                                    disabled={!this.state.isFormValid}
                                >
                                    Добавить вопрос
                                </Button>

                                <Button
                                    type="success"
                                    onClick={this.createQuizHandler}
                                    disabled={this.props.quiz.length === 0}
                                >
                                    Создать тест
                                </Button>

                            </form>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.QuizCreator}>
                    <div>
                        <h1>Создание теста</h1>

                        <h2>Только зарегистрированные пользователи могут создавать тесты. Перейдите на страницу авторизации и зайдите в систему, используя логин и пароль, введённые при регистрации!</h2>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
      quiz: state.create.quiz,
      isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)