import React from 'react'
import classes from './AnswersItem.module.css'

const AnswersItem = props => {
    // console.log(props)

    const cls = [classes.AnswersItem]

    if (props.stateClickFromAnswerList) {
        cls.push(classes[props.stateClickFromAnswerList])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.onAswerClickFromAnswerList(props.answerFromAnswerList.id)}
        >
            { props.answerFromAnswerList.text }
        </li>
    )
}

export default AnswersItem;