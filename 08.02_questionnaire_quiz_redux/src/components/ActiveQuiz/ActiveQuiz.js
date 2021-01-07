import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

// Текущий вопрос
const ActiveQuiz = (props) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{ props.answerNumberFromQuiz }.</strong>&nbsp;
                {props.questionFromQuiz}
            </span>
            <small>{ props.answerNumberFromQuiz } из { props.quizLengthFromQuiz } </small>
        </p>

        <AnswersList 
            answerFromActiveQuiz={props.answerFromQuiz}
            onAswerClickFromActiveQuiz={props.onAswerClickFromQuiz}
            stateClickFromActiveQuiz={props.stateClickFromQuiz}
        />
    </div>
)

export default ActiveQuiz;