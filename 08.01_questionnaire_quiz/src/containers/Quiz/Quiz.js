import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

//Блок с вопросами.
class Quiz extends React.Component {

    state = {
        activeQuestion: 0,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                answers: [
                    {text: 'Голубой', id: 1},
                    {text: 'Фиолетовый', id: 2},
                    {text: 'Зелёный', id: 3},
                    {text: 'Жёлтый', id: 4}
                ],
                rightAnswerId: 1
            },
            {
                id: 2,
                question: 'Сколько километров от Москвы до Смоленска?',
                answers: [
                    {text: '1000', id: 1},
                    {text: '380', id: 2},
                    {text: '9000', id: 3},
                    {text: '8000', id: 4}
                ],
                rightAnswerId: 2
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('Нажат ответ c номером ИД:', answerId)

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswerId === answerId) {
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('Тестирование завершено!')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1
                    }) 
                }
                window.clearTimeout(timeout) //чтобы не было утечки памяти, останавливаем счёт, как только выполнена функция.
            }, 1000)
        } else {

        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        console.log('Номер вопроса:', this.state.activeQuestion + 1, 'из', this.state.quiz.length)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                <h1>Выберите один из вариантов ответа</h1>
                    <ActiveQuiz
                        answerFromQuiz={this.state.quiz[this.state.activeQuestion].answers} // Ответ
                        questionFromQuiz={this.state.quiz[this.state.activeQuestion].question} // Вопрос
                        onAswerClickFromQuiz={this.onAnswerClickHandler} // Обработчик нажатия на ответ
                        quizLengthFromQuiz={this.state.quiz.length} // Длина массива с вопросами
                        answerNumberFromQuiz={this.state.activeQuestion + 1} // Номер вопроса
                    />
                </div>
            </div>
        );
    }
}

export default Quiz;