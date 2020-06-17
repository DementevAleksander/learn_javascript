'use strict';

// 1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос:
// 'Сколько фильмов вы уже посмотрели?'

const numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");
console.log(numberOfFilms);

/*2) Создать объект personalMovieDB и в него поместить такие свойства:
    - count - сюда передается ответ на первый вопрос
    - movies - в это свойство поместить пустой объект
    - actors - тоже поместить пустой объект
    - genres - сюда поместить пустой массив
    - privat - в это свойство поместить boolean(логическое) значение false*/

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
console.log(personalMovieDB);

/* 3) Задайте пользователю по два раза вопросы:
    - 'Один из последних просмотренных фильмов?'
    - 'На сколько оцените его?'
Ответы стоит поместить в отдельные переменные
Записать ответы в объект movies в формате: 
    movies: {
        'logan': '8.1'
    }

Проверить, чтобы все работало без ошибок в консоли */

const Question1 = prompt("Один из последних просмотренных фильмов?", ""),
      Question2 = prompt("На сколько оцените его?", ""),
      Question3 = prompt("Один из последних просмотренных фильмов?", ""),
      Question4 = prompt("На сколько оцените его?", "");

personalMovieDB.movies = [Question1, Question2];
personalMovieDB.movies[Question3] = Question4;

console.log(personalMovieDB);