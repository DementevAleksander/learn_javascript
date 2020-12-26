import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {

    const successCount = Object.keys(props.resultsFromQuiz).reduce((total, key) => {
        if (props.resultsFromQuiz[key] === 'success') {
            total++
        }
        return total
    }, 0) // Object.key(props.resultsFromQuiz) - конвертируем объект в массив ключей этого объекта. .reduce() - считаем массив.
    

    return (
        <div className={classes.FinishedQuiz}>
            Тестирование завершено!
            <ul>
                {props.quizFromQuiz.map((quizItem, index) => {

                    const cls = [
                        'fa',
                        props.resultsFromQuiz[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.resultsFromQuiz[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />

                        </li>
                    )
                })}
            </ul>

            <p>Правильно {successCount} из {props.quizFromQuiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Повторить</Button>
                <Link to='/'>
                    <Button type="success">Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;