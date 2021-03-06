import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

//Блок с вопросами.
class Quiz extends React.Component {

    state = {
        results: {}, //Результаты теста.
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //Текущий клик пользователя, правильный львет или не правильный.
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        // console.log('Нажат ответ c номером ИД:', answerId)

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        } //избавляемся от ошибки с двойным кликом по правильному ответу (при двойном клике система считатет, что мы два раза ответили)

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results //можно записать просто одним словом results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    // console.log('Тестирование завершено!')
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    }) 
                }
                window.clearTimeout(timeout) //чтобы не было утечки памяти, останавливаем счёт, как только выполнена функция.
            }, 1000)
        } else {
            results[question.id] = 'error' //если пользователь ответил неправильно, то ставим для этого id error.
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    async componentDidMount() {

        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {

        }

        console.log('Quiz ID =', this.props.match.params.id)
    }

    render() {
        // console.log('Номер вопроса:', this.state.activeQuestion + 1, 'из', this.state.quiz.length)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите один из вариантов ответа</h1>

                    {
                        this.state.loading
                        ? <Loader />
                        : this.state.isFinished
                            ? <FinishedQuiz
                                resultsFromQuiz={this.state.results}
                                quizFromQuiz={this.state.quiz}
                                onRetry={this.retryHandler}
                              />
                            : <ActiveQuiz
                                answerFromQuiz={this.state.quiz[this.state.activeQuestion].answers} // Ответ
                                questionFromQuiz={this.state.quiz[this.state.activeQuestion].question} // Вопрос
                                onAswerClickFromQuiz={this.onAnswerClickHandler} // Обработчик нажатия на ответ
                                quizLengthFromQuiz={this.state.quiz.length} // Длина массива с вопросами
                                answerNumberFromQuiz={this.state.activeQuestion + 1} // Номер вопроса
                                stateClickFromQuiz={this.state.answerState} // Проверка на правильность ответа
                            />

                    }
                </div>
            </div>
        );
    }
}

export default Quiz;