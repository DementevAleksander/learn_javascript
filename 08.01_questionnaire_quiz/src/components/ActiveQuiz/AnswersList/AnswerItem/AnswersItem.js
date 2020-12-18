import React from 'react'
import classes from './AnswersItem.module.css'

const AnswersItem = props => {
    // console.log(props)
    return (
        <li
            className={classes.AnswersItem}
            onClick={() => props.onAswerClickFromAnswerList(props.answerFromAnswerList.id)}
        >
            { props.answerFromAnswerList.text }
        </li>
    )
}

export default AnswersItem;