/* Задания на урок:

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

 */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// Моя версия.

/*1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.*/

const confrm = document.querySelector('button');

confrm.addEventListener('click', (e) => {
    let filmUser = document.querySelector('.adding__input').value; //получили введёный пользователем фильм.
    
    if (filmUser !=="") {
        e.preventDefault(); //Отменяем стандатное поведение браузера.
        
        // 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
        if (filmUser.length > 21) { //если количество символов больше 21
            filmUser = filmUser.slice(0, 21); //то убираем текст, начиная с 22го символа.
            console.log(filmUser);
            const points = '...';
            filmUser = filmUser + points; //Добавляем вконце три точки.
        }

        // 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм"
        const yes = document.querySelector('.yes').previousElementSibling;
        if (yes.checked === true) {
            alert('Добавляем любимый фильм!');
        }

        movieDB.movies.push(filmUser); //добавили новый фильм пользователя в movieDB.movies
        console.log(movieDB.movies);
        
        const movieList = document.querySelector('.promo__interactive-list'); //получили структуру списка с фильмами.
        movieList.innerHTML = ""; //очистили структуру списка фильмов.
        // 5) Фильмы должны быть отсортированы по алфавиту
        movieDB.movies.sort(); // отсотировали фильмы в movieDB.movies с новым фильмом пользователя по алфавиту.
        movieDB.movies.forEach((film, i) => { //перебираем все фильмы из movieDB.movies.
            movieList.innerHTML += // берём предыдущее значение .innerHTML (пустота) и добавляе запись в кавычках.
            `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

    } else {
        alert('Введите название фильма!');
        e.preventDefault();
    }
});