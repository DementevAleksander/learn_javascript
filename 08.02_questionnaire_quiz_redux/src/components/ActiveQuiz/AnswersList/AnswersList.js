import React from 'react'
import classes from './AnswersList.module.css'
import AnswersItem from './AnswerItem/AnswersItem'

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answerFromActiveQuiz.map((answer, index) => {
            return (
                <AnswersItem
                    key={index}
                    answerFromAnswerList={answer}
                    onAswerClickFromAnswerList={props.onAswerClickFromActiveQuiz}
                    stateClickFromAnswerList={props.stateClickFromActiveQuiz ? props.stateClickFromActiveQuiz[answer.id] : null}
                />
            )
        }) }
    </ul>
)

export default AnswersList;