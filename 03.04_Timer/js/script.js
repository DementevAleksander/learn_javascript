/*
window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2020-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

});
*/

'use strict';
window.addEventListener('DOMContentLoaded', () => { //Загружаем DOM структуру.
    const tabs = document.querySelectorAll('.tabheader__item'), //Получаем все вкладки.
          tabsContent = document.querySelectorAll('.tabcontent'), //Получаем весь контентент для вкладок.
          tabsParent = document.querySelector('.tabheader'); //Получаем родитеьский элемент вкладок.
    
    function hideTypeContent() { //Создаём функуию, которая скрывает контент вкладки.
        tabsContent.forEach(item => { // перебираем псевдомасив с .tabcontent
            //item.style.display = 'none'; //скрыть каждый.tabcontent. в реальных проектах не всегда испольуются inline.
            item.classList.add('hide'); //добавляем класс hide, который скрывает контент.
            item.classList.remove('show', 'fade'); //добавляем класс show, который показывает контент,убираем анимацию.
            // toggle использовать нельзя.
        });
        
        tabs.forEach(item => { //Убираем класс активности. Перебираем псевдомасив с .tabheader__item
            item.classList.remove('tabheader__item_active'); //удаляем ...._active найденный в .tabheader__item.
        });
    }

    function showTypeContent(i = 0) { //Создаём функуию, которая показывает контент вкладки.
        // По умолчанию выводится первый элемент.
        // tabsContent[i].style.display = 'block'; //в реальных проектах не всегда испольуются inline стили.
        tabsContent[i].classList.add('show', 'fade'); //добавляем класс hide, который скрывает контент + анимация.
        tabsContent[i].classList.remove('hide'); //добавляем класс show, который показывает контент.
        tabs[i].classList.add('tabheader__item_active'); //добавляем ...._active найденный в .tabheader__item.
    }

    hideTypeContent();
    showTypeContent(); //по умолчанию показываем контент первой вкладки.

    // Делегирование событий и назначаем обработчик событий клика.
    // Когда кликнули в пункт меню определяем его № в списке всех табов и по этому № вызываем функцию showTypeContent(),
    // то есть показываем контент и делается это перебором. Перебераем все табы, и сравниваем,
    // если элемент, который находится в псевдомассиве .tabheader__item совпадает с тем элементом,
    // который кликнул пользователь, тогда мы берём его номер и показываем на странице.
    tabsParent.addEventListener('click', (event) => { //Нажимаем на .tabheader
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) { //кликнули точно на вкладку.
            tabs.forEach((item, i) => { //перебираем массив с вкладками .tabheader__item.
                if (target == item) { // если .tabheader__item совпадаем с элементом в .forEach, то есть item.
                    hideTypeContent(); //то скрываем весь контент.
                    showTypeContent(i); //показываем тот порядковый элемент i в который кликнули.
                }
            });
        }
    });

    // Timer
    const deadline = '2020-07-31'; //Это будет отправная точка. Будущая дата.
    // Делаем функцию, которая определяет разницу между деадлайном и текущим временем.
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //получаем разницу в милисекундах между конечной датой и текущей датой.
        // Метод Date.parse() разбирает строковое представление даты и возвращает количество миллисекунд.
        //Превращаем количество милисекунд в формат Дни/Часы/Минуты/Секунды.
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
        //Подсчитать количество дней, которые будут отображаться в таймере. Делим количество милисекунд на количество милисекунд, которые находятся в одном дне.
        // Количество милисекунд умножаем на 60, получаем милисекунд в одной минуте, дальше снова на 60, получаем милисекунд в часе, умножаем на 24, получаем количество милисекунд в сутках.
        // Делим оставшиеся милисекунды до deadline на количество милисекунд в сутках, полуаем количество суток.
        // Math.floor() - округление до целого числа.
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              // (1000 * 60 * 60) - получаем количество милисекунд в часе, t / (1000 * 60 * 60) - получаем оставшееся количество часов, % 24 - делим количество часов на 24 и получаем остаток, таким образом мы получаем число, которое не хватает до полных суток.
              //Например, при делении t / (1000 * 60 * 60) получилось 50 часов. 50 делим на 24, получаем два дня (48), и в остатке два часа.
              minutes = Math.floor((t / 1000 / 60) % 60), //Минуты
              seconds = Math.floor((t / 1000) % 60); //Секунды

              //Чтобы вывести переменные наружу, используем return
              return { //Возвращаем объект и возвращаем из функции
                'totalMs': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
              };
    }
    // Когда число в таймере однозначное, подставляем вмереди нолик.
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`; //модифицируем, подставляем спереди нолик.
        } else {
            return num; //не модифицируем число.
        }
    }


    // Устанавливаем таймер на страницу.
    function setClock(selector, endtime) {
        //Помещаем элементы со страницы
        const timer = document.querySelector(selector), //получаем корневой ээлемент таймера .timer
              days = timer.querySelector('#days'), // поучаем #days внутри .timer
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
        updateClock(); //Указываем здесь, чтобы убрать мигание таймера при обновлении страницы. Нужно, когда const timeInterval = setInterval(updateClock, 1000); указана выше самой функции обновления.
        //Обновляем таймер каждую секунду.
        function updateClock() {
            const t = getTimeRemaining(endtime); //Расчёт времени, который остался на текущую секунду. Это дедлай, который передаётся в setClock. Получаем объект с набором интересующих нас свойств.
            //Помещаем расчётные величины на страницу.
            days.innerHTML = getZero(t.days); //берём количество дней, котрое нужно отобразить на странице. getZero() - модифицирует число.
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //Когда функция запустится, она расчитает нужно время и на основании этих расчётов она бедут записывать на страницу все эти результаты.
            //Запускаем функцию каждую секунду.
            const timeInterval = setInterval(updateClock, 1000); //Запуск функции через определённый промежуток времени.
            //Останавливаем таймер
            if (t.totalMs <= 0) { //если разница между текущим временем и деадлайном меньше или равно 0,
                clearInterval(timeInterval); //то перестаём обновлять таймер.
            }
        }
        updateClock();
    }
    //вызываем все функции
    setClock('.timer', deadline);

});


