/* Задание на урок:

1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы

2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.

3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

'use strict';

/* 1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы */
let personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: true,
    //Метод "Сколько фильмов вы уже посмотрели?"
    startQuestion: function () {
        personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?", "");
        }
    },

/* 3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/
    
    //Метод "Три раза с просить про Жанр."
    favoritJanre: function () {
        for (let i = 1; i < 5; i++) {

            let genres = prompt(`Ваш любимый жанр под номером ${i}`);
            // != null - не нажата "Отмена", != '' - не пустое значение, a.length < 50 - введено знаков не более 50.
            if (genres == null || genres === '') {
                console.log('Поле обязательно для заполнения, отменить нельзя');
                console.log(i);
                i--;
            } else {
                personalMovieDB.genres[i - 1] = genres;
                console.log('done');
                console.log(i);
            }
            personalMovieDB.genres.forEach((item, i) => {
                console.log(`Любимый жанр ${i + 1} - это ${item}`);
            });
        }
    },

    // Альтернативный вариант из урока
    
    // let genres = prompt(`Введите ваши любимые жанры через запятую`).toLowerCase();

    // if (genres === '' || genres == null) {
    //     console.log('Вы ввели некорректные данные или не ввели их вовсе');
    //     i--;
    // } else {
    //     personalMovieDB.genres = genres.split(', ');
    //     personalMovieDB.genres.sort();
    // } 

    //Справшиваем оценку фильмам.
    raitingFilfs: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
                console.log(i);
            // != null - не нажата "Отмена", != '' - не пустое значение, a.length < 50 - введено знаков не более 50.
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b; // [a] - свойство объекта, = b - значение свойства.
                console.log('done');
                console.log(i);      
            } else {
                console.log('error');
                i--;
                console.log(i);
            }
        } 
    },
    raitingUser: function() {
        if (personalMovieDB.count <= 10) {
            console.log('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count > 10 && personalMovieDB.count <= 30) {
            console.log('Вы классический зритель');
        } else if (personalMovieDB.count > 30) {
            console.log('Вы киноман');
        } else {
            console.log('Произошла ошибка');
        }
    },
/* 2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB. */

    toggleVisibleMyDB: function() {
        if (personalMovieDB.privat === false) {
            personalMovieDB.privat = true;
        } else {
            personalMovieDB.privat = false;
        }
    }
};
//personalMovieDB.startQuestion();
personalMovieDB.favoritJanre();
//personalMovieDB.raitingFilfs();
//personalMovieDB.raitingUser();
// console.log(personalMovieDB.privat);
// personalMovieDB.toggleVisibleMyDB();
console.log(personalMovieDB.genres);

/*
function showMyDB(hidden) {
   if (!hidden) {
    console.log(personalMovieDB);
   }
}
showMyDB(personalMovieDB.privat);
*/
