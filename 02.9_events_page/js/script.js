'use strict';

// const movieDB = {
//     movies: [
//         "Логан",
//         "Лига справедливости",
//         "Ла-ла лэнд",
//         "Одержимость",
//         "Скотт Пилигрим против..."
//     ]
// };

// Моя версия.

// 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
// новый фильм добавляется в список. Страница не должна перезагружаться.
// Новый фильм должен добавляться в movieDB.movies.
// Для получения доступа к значению input - обращаемся к нему как input.value;
// P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
/*
document.addEventListener('DOMContentLoaded', () => { //выполнение действий после загрузки DOM.
    
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
            
            const movieList = document.querySelector('.promo__interactive-list'); //получили структуру списка с кино.
            const deltd = document.querySelectorAll('.delete');
            
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
            // Назначаем события на все корзины.
                deltd.forEach((btn, i) => { //перебираем все корзинки, вешаем одно и тоже событие
                    // i - нумерация, чтобы знать номер элемента для удаления.
                    btn.addEventListener('click', () => { // обрщаемся к каждой корзинке.
                        btn.parentElement.remove(); //удаляем родительский элемент.
                        movieDB.movies.slice(i, 1);
                        //удаляем с БД, i - номер, который удалили, 1 - сколько элементов удалить.
                        //Рекурсия - вызов функции внутри себя же. В данном случае - перестроение элементов заново.
                        
                    });
                }); //перебираем элементы.
            });


        } else {
            alert('Введите название фильма!');
            e.preventDefault();
        }
    });

});
*/

//-----------------------------------Как задумывал Тьютер--------------------------//
document.addEventListener('DOMContentLoaded', () => { //следим за событием - загрузка всего DOM дерева страницы.
// Дальше callback-фугкция, что будет происходить после загрузки дерева.
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    // 1) Удалить все рекламные блоки со страницы (правая часть сайта)
    const adv = document.querySelectorAll('.promo__adv img');
    // adv.forEach(item => { //item - каждый полученный элемент удаляем.
    //     item.remove();
    // });
    //Делаем удаление рекламных блоков универсальным, оборачива в функцию.
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });  
    };
    deleteAdv(adv);

    // 2) Изменить жанр фильма, поменять "комедия" на "драма"
    const poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre');
          
    const makeChanges = () => {
        genre.textContent = 'драма'; // получаем .promo__bg и записываем в него 'драма'
        // 3) Изменить задний фон постера с фильмом .promo__bg на изображение "bg.jpg". Оно лежит в папке img.
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();

    // 4) Список фильмов на странице сформировать на основании данных из этого JS файла.
    // Отсортировать их по алфавиту 
    // movieDB.movies.sort();
    const sortArr = (arr) => {
        arr.sort();
    };
    sortArr(movieDB.movies);
    // и
    // 5) Добавить нумерацию выведенных фильмов
    const movieList = document.querySelector('.promo__interactive-list');
    //Создаём функцию, в которой будет создаваться список фильмов.
    /*
    function createMovieList () {
        // film - введённый фильм. parent - родительский элемент фильма.
        movieList.innerHTML = ""; // Очищаем .promo__interactive-list
        movieDB.movies.forEach((film, i) => { //film - каждый фильм, который содержится в массиве, i - номер по порядку.
            //  .forEach((currentValue, index, array));
            // currentValue = Текущий обрабатываемый элемент в массиве.
            // index = Индекс текущего обрабатываемого элемента в массиве.
            // array = Массив, по которому осуществляется проход.

            movieList.innerHTML += // += - дополнитеьное присваивание.
            //Бберём предыдущее значение (пустота+каждый новый элемент с фильмом) и добавляем запись в кавычках.
            // a = a + "Привет!"; тоже самое что a += "Привет!";
            `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        }); */
        
    // Сделаем функцию добавления нового фильма (выше) более универсальной.
    function createMovieList (films, parent) { //Задаём два аргумента.
        // film - введённый фильм. parent - родительский элемент фильма.
        // 5) Фильмы должны быть отсортированы по алфавиту
        sortArr(movieDB.movies);//Сортируем все фильмы movieDB.movies по алфавиту.

        parent.innerHTML = ""; // Очищаем .promo__interactive-list
        films.forEach((film, i) => {
            //film - каждый фильм, содержащийся в массиве, i - номер по порядку.
            //  .forEach((currentValue, index, array));
            // currentValue = Текущий обрабатываемый элемент в массиве.
            // index = Индекс текущего обрабатываемого элемента в массиве.
            // array = Массив, по которому осуществляется проход.

            parent.innerHTML += 
            // += - дополнитеьное присваивание.
            //Бберём предыдущее значение (пустота+каждый новый элемент с фильмом) и добавляем запись в кавычках.
            // a = a + "Привет!"; тоже самое что a += "Привет!";
            `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
        // 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно).
        // Назначаем события на все корзины.
        document.querySelectorAll('.delete').forEach((btn, i) => { //перебираем все корзинки, вешаем одно и тоже событие
            // i - нумерация, чтобы знать номер элемента для удаления.
            btn.addEventListener('click', () => { // обрщаемся к каждой корзинке после клика.
                btn.parentElement.remove(); //удаляем родительский элемент.
                movieDB.movies.splice(i, 1);
                //удаляем с БД, i - номер, который удалили, 1 - сколько элементов удалить.
                //Рекурсия - вызов функции внутри себя же (сама себя). В данном случае - перестроение элементов заново.
                createMovieList(films, parent); //чтобы выровнить нумерацию фильмов.
            });
        }); //перебираем элементы.
    }
    createMovieList(movieDB.movies, movieList);

    // 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    // новый фильм добавляется в список. Страница не должна перезагружаться.
    // Новый фильм должен добавляться в movieDB.movies.
    // Для получения доступа к значению input - обращаемся к нему как input.value;
    // P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    // 5) Фильмы должны быть отсортированы по алфавиту
    const addFilm = document.querySelector('form.add'), //получаем структуру элементов формы.
          addInput = addFilm.querySelector('.adding__input'), //внутри form.add получаем тэги с полем ввода фильма.
          checkbox = addFilm.querySelector('[type="checkbox"]'); //внутри form.add теги с HTML атрибутом type =checkbox.
    //Чтобы отследить отпраку формы на сервер используем событие submit.
    addFilm.addEventListener('submit', (event) => { //После того, как нажата кнопка form.add отправки данных на сервер.
        // Испольуем атрибут event для того, чтобы отменить стандартное поведение браузера.
        event.preventDefault(); //при нажатии на кнопку отправки браузер не перезагружается.
        // Далее смотрим, что пользователь ввёл в поле с названием фильма.
        let newFilm = addInput.value; //обращаемся к .adding__input, который заполнял пользователь и проверяем value.
        const favorite = checkbox.checked; //Полусаем отметку "Да!" true - стоит галка, fulse - галочка не стоит.
        if (newFilm) { //выполняется только тогда, когда .adding__input заполнен (true), так как пустота, это false.
            // 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм"
            if (favorite) {
                console.log("Добавляем любимый фильм!");
            }
            // 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
            if (newFilm.length > 21) { //если количество символов больше 21
                newFilm = `${newFilm.substring(0, 22)}...`; //убираем текст с 22го символа Добавляем вконце три точки.
            }
            movieDB.movies.push(newFilm); //Поместим новый введённый фильм .adding__input.value в базу данных.
            sortArr(movieDB.movies);//Сортируем все фильмы movieDB.movies по алфавиту.
            createMovieList (movieDB.movies, movieList); //создаём список фильмов.
        } else {
            alert("Введите, пожалуйста, название фильма!");
        }
        event.target.reset(); //сбросить форму с фильмами addFilm.
    });

//-------------------------------//
});
