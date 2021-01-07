import React from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
// import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';

//Блок с вопросами.
class Quiz extends React.Component {


    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        // console.log('Номер вопроса:', this.state.activeQuestion + 1, 'из', this.state.quiz.length)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите один из вариантов ответа</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz
                                resultsFromQuiz={this.props.results}
                                quizFromQuiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                              />
                            : <ActiveQuiz
                                answerFromQuiz={this.props.quiz[this.props.activeQuestion].answers} // Ответ
                                questionFromQuiz={this.props.quiz[this.props.activeQuestion].question} // Вопрос
                                onAswerClickFromQuiz={this.props.quizAnswerClick} // Обработчик нажатия на ответ
                                quizLengthFromQuiz={this.props.quiz.length} // Длина массива с вопросами
                                answerNumberFromQuiz={this.props.activeQuestion + 1} // Номер вопроса
                                stateClickFromQuiz={this.props.answerState} // Проверка на правильность ответа
                            />

                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) { //принимает state и возвращает новый объект.
    return {
      results: state.quiz.results,
      isFinished: state.quiz.isFinished,
      activeQuestion: state.quiz.activeQuestion,
      answerState: state.quiz.answerState,
      quiz: state.quiz.quiz,
      loading: state.quiz.loading
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchQuizById: id => dispatch(fetchQuizById(id)),
      quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
      retryQuiz: () => dispatch(retryQuiz())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Quiz)