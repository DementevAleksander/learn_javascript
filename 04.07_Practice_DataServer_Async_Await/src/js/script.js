'use strict';
window.addEventListener('DOMContentLoaded', () => { //Загружаем DOM структуру.

    //--------------------- Переключение контента по нажатию на вкладку Tab --------------//
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

    //------------------------------------- Таймер на сайте -------------------------------//
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

    //------------------------------ Работа с модальным окном -------------------------//
    // Создаём модальное окно.
    // В HTML для модального окна прописывает атрибут data-modal. Пример, <button data-modal class="btn btn_dark">Связаться с нами</button>.
    // Для закрытия модального окна прописываем дата атрибут data-close. Например, <div data-close class="modal__close">&times;</div>.
    //Создаём две функции. 1 - отвечает за открытие модального окна, 2 - за закрытие.
    const modalTridder = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
          // modalCloseBtn = document.querySelector('[data-close]'); //если обработчики событий создаются динамически, то этот элемент на него уже не повесится. Это одна из причин, почему необходимо использовать делегирование событий. Поправим функционал, чтобы он работал со всеми кнопками, в том числе и крестиком, даже если он формируется динамически.

    //Если код повторяется, хотя бы два раза, то необходимо ко выносить в отдельную функцию.
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // Альтернативный вариант с toggle
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden'; //Убираем прокрутку сайта.
        clearInterval(modalTimerId); //Если пользователь сам вызвал модальное окно, то оно не будет открываться повторно через заданный промежуток времени.
    }
    
    //Перебираем modalTridder (data-modal).
    modalTridder.forEach(btn => {
        //При нажатии на кнопку button Связаться с нами, открываем модальное окно.
        btn.addEventListener('click', openModal);
    });

    //Если код повторяется, хотя бы два раза, то необходимо ко выносить в отдельную функцию.
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //Возвращаем прокрутку сайта.
    }

    //Закрываем модальное окно.
    // modalCloseBtn.addEventListener('click', () => {
    //     closeModal();
    // });
    //Правильный вариант написания закрытя модального окна.
    // modalCloseBtn.addEventListener('click', closeModal);

    //Закрываем моддальное окно по нажатию не только на крестик, но и на подложку.
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //Свойство target интерфейса Event является ссылкой на объект, который был инициатором события или e.target это крестик модального окна, если он присутсвует, то мы будем закрывать модальное окно.
            closeModal();
        }
    });

    //Закрываем модальное окно по нажатию Esc на клавиатуре.
    document.addEventListener('keydown', (e) => { 
        if (e.code === "Escape" && modal.classList.contains('show')) { //Закрываем модальное окно по нажатию Esc на клавиатуре только тогда, когда модальное окно открыто.
            //modal.classList.contains('show') - проверяем, есть ли для узла с классом .modal класс .show.
            closeModal();
        }
    });

    //Вызываем модальное окно через промежуток времени.
    const modalTimerId = setTimeout(openModal, 30000);

    //Вызываем модальное окно когда страница долистана до конца.
    //Чтобы определить, что пользователь долистал до конца делаем математическую формулу - берём свойство, которое отвечает за прокрутку сверху, затем берём свойство, которое отображает высоту пользовательского окна (видимой части) и будем её сравнивать со scrollHeight,
    //то есть с полной прокруткой и с полным контентом, который есть и если два этих выражения будут совпадать, то значит, что пользователь долистал до конца.
    function showModuleByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //если пользователь долистал до конца
            openModal();
            window.removeEventListener('scroll', showModuleByScroll); // Удаляем обработчик события. Когда пользователь долистывает до конца страницы модальное окно открывается только один раз. 
        }
    }
    window.addEventListener('scroll', showModuleByScroll);
    
    //------------------------------ Классы стандарт ES6 -------------------------//
    // Используем классы для карточек.
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //массив
            this.parent = document.querySelector(parentSelector); //получаем один элемент. 
            this.transfer = 72; //курс валют.
            this.changeToRUB(); //Конвертация валюты.
        }
        //Создаём дополнитеьный метод, который будет заниматься конвертацией валют.
        changeToRUB () {
            this.price = this.price * this.transfer;
        }
        // Ещё один метод для формирования вёрстки. В данном случае render классическое название.
        render (){
            const element = document.createElement('div'); //создаём элемент в JS <div></div>
            if (this.classes.length === 0) {
                this.element = 'menu__item';//перезаписываем массив.
                element.classList.add(this.element); //ставим дефолтный класс
            } else {
            //Обрабатываем массив ...classes, проходимся по каждому элементу, вытаскиваем название класса и подсоединяем его к div.
            this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = // обращаемся к элементу <div></div>. Через innerHTML динамически создаём структуру, указывая меняющиеся элементы.
            `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
                </div>
            `;
            //Нужно указать, куда мы будем помещать все эти карточки. Каждый раз, когда будет вызываться MenuCard это родитель может быть абсолютно разным. Для этого создаём в MenuCard дополнительный аргумент parentSelector, то есть передаём именно селектор parentSelector. Соответственно нужно получить элемент со страницы, куда мы будем помещать этот элемент.
            this.parent.append(element); //Помещаем новый элемент внутрь элемента. Метод ParentNode.append добавляет набор объектов Node или DOMString в конец (после последнего потомка) ParentNode. DOMString объекты добавляются как Text.
        }
    }
    //Класс готов. Теперь его можно использовать.

    const getResource = async (url) => { //Получаем данные с сервера.
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json(); 
    }; 

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => { //реструктуризация объекта, вытаскиваем свойства объекта.
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); //.menu .container указываем родителя, куда мы будем всё это пушать.
        });
    });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => { //обращаемся к тем данным, которые получили.
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render(); //.menu .container указываем родителя, куда мы будем всё это пушать.
    //         }); 
    //     });

    //Динамическая вёрстка. Минус в том, что нет шаблонизации. Данный способ подходит в том случае, если нужно один раз сформировать вёрстку.
        // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }


    //Создаём новый объект и вызываем метод render().
    // const div = new MenuCard();
    // div.render();
    // Альтернативный сбособ создания объекта. Используется только тогда, когда объект создаётся в одном месте и затем на него нет ссылок. В других сллучаях нужно использовать переменную, чтобы объект не потерялся.
    new MenuCard(
        "img/tabs/vegy.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
        "vegy",
        'Меню "Фитнес"', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9, //долларов. Число трансформируется через метод changeToRUB ().
        '.menu .container',
        'menu__item',
        'big'
    ).render();
    // Создаём ещё карточки. Пока что копируем. Но нужно уходить от копипаста и оптимизмровать код.
    new MenuCard(
        "img/tabs/elite.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
        "elite",
        'Меню “Премиум”', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14, //долларов. Число трансформируется через метод changeToRUB ().
        '.menu .container',
        'menu__item',
        'big'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
        "post",
        'Меню "Постное"', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21, //долларов. Число трансформируется через метод changeToRUB ().
        '.menu .container',
        //'menu__item',
        //'big'
    ).render();

    //---------------------- Скрипт отправки данных на сервер. Вариант №2 -------------------------//
    //Современный метод.
    //Задача - взять несколько форм, которые есть на сайте и с них отправлять данные к файлу server.php.
    //Чтобы не создавать два обработчика (так как две формы отпраквки), мы его обернём в функцию.
    const form = document.querySelectorAll('form');    //Получаем все формы по тегу form
    //Пишем функцию, которая отвечает за постинг данных.
    const message = { // Сообщения по итогам обращения к серверу.
        //loading: 'Загрузка',
        loading: 'img/form/spinner.svg', //Исползуем спиннер.
        success: 'Спасибо! Мы свяжемся с вами в ближайшее время!',
        failure: 'Что-то пошло не так! Поломалося!',
    };

    //Берём все формы и под каждую из них подвязываем bindPostData().
    form.forEach(item => {
        bindPostData(item);
    });
    
    //пишем функцию postData, которая обрабатывает запрос к серверу, fetch'ит.
    //Получаем ответ от сервера, например, что запостили успешно. После этого трансформирует ответ в JSON-формат.
    const postData = async (url, data) => { // postData - отвечает за постинг данных на сервер. async - внутри функции будет асинхронный код, для async необходимо использовать парный оператор await, await ставим перед теми операциями, которые нужно дождаться. async и await всегда используются вместе.
        let res = await fetch(url, { // fetch - запрос. Fetch API предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP. Он также предоставляет глобальный метод fetch(), который позволяет легко и логично получать ресурсы по сети асинхронно. Подобная функциональность ранее достигалась с помощью XMLHttpRequest.
        // await - сначала ждёт пока запрос будет отправлен на сервер и только когда получили ответ от сервера записываются данные в переменную res.
            //Задаём настройки - метод и body (которое отправляем).
            method: 'POST',
            headers: { //Заголовки, какой контент мы отправляем.
                'Content-Type': 'application/json'
            },
            body: data //данные формы.
        }); 
        //Обрабатываем JSON-формат.
        return await res.json(); //Обозначение объектов JavaScript (JSON - JavaScript Object Notation) - стандартный текстовый формат для представления структурированных данных на основе синтаксиса объекта JavaScript. Он обычно используется для передачи данных в веб-приложениях (например, отправка некоторых данных с сервера клиенту,таким образом чтобы это могло отображаться на веб-странице или наоборот).
        // await - дожидаемся окончания работы промисса json() и только после этого он его возвращает из функции.
    };

    

    function bindPostData(form) { // bindPostData - привязка постинга, то есть привязать какой-то постинг данных.
        form.addEventListener('submit', (e) => { //Отслеживаем отправку данных. Нажатие кнопки.
            e.preventDefault(); //отменяем стандартное поведение браузера.
            //Динамически создаём новый блок для сообщения, который добавляется к форме.
            let statusMessage = document.createElement('img'); 
            statusMessage.src = message.loading; //спиннер 'img/form/spinner.svg' вместо текста div
            statusMessage.style.cssText = //В img записали стили. Правильнее помещать в CSS.
            ` 
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); //'afterend' - Куда вставляем (после формы), statusMessage - что вставляем.

            //Отправляем данные на сервер.
            const formData = new FormData(form); //собираем данные из document.querySelector('form');. Создаём объект, в котором будут введённые данные.

            const obj = {a: 23, b: 50};
            console.log(Object.entries(obj));
            // Вывод в консоль [ [ 'a', 23 ], [ 'b', 50 ] ]
            
            //Трансформируем formData в JSON формат.
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // .entries() - получаем данные с формы в формате массива. .fromEntries() - Превращаем массив в объект. Затем объект превращаем в JSON-формат.

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); //При полоительном результате выводим объект с данными в консоль.
                console.log(message.success);
                showThanksModal(message.success); //Запускаем функцию с сообщением, что всё ОК. Показывается модальное окно и через 4 чекунды оно закрывается, вместе с тексом и возвращением изначального контента, который там был.
                statusMessage.remove();}) //Удаляем спиннер.
            .catch(() => {
                console.log(message.failure);
                showThanksModal(message.failure);}) //При отрицательном запросе к БД выдаём сообщение об ошибке. Если promise попадает на ошибку протокла, то он не выдаст reject, для него это не считается ошибкой, он нормально выполнит при этом resolve. Главное для fetcha - ээто то, что он вообще смог выполнить запрос. reject будет возникать только при сбое сети или что-то там запросу вообще выполниться.
            .finally(() => { //При любом исходе.
                form.reset();}); //Очищаем форму.
        });
    }

    //---------------------- Улучшаем форму отправки данных на сервер -------------------------//
    function showThanksModal(message) { //message - соообщение, которое будет отправляться пользователю.
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //Скрываем .modal__dialog добавлением класса .hide.
        openModal(); //Функция описана выше. Открывает модальное окно modal.classList.add('show'); modal.classList.remove('hide');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); //Для div добавляем класс modal__dialog.
        thanksModal.innerHTML = //формируем вёрстку.
        `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal); //получаем модальное окно и аппендим туда наш блок.
        //Если пользователь захочет снова открыть модальное окно, тогда всё должно возвращаться на свои места. Новый блок исчезал, а старый возвращался на место.
        setTimeout(() => {
            thanksModal.remove(); //через 4 секунды удаляем div с классом modal__dialog.
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //---------------------- FetchAPi -------------------------//
    //Новая технология обращения к БД, которая сейчас много где используется.
    //Fetch API предоставляет интерфейс JavaScript для работы с запросами и ответами HTTP. Он также предоставляет глобальный метод fetch(), который позволяет легко и логично получать ресурсы по сети асинхронно.
    //Подобная функциональность ранее достигалась с помощью XMLHttpRequest. Fetch представляет собой лучшую альтернативу, которая может быть легко использована другими технологиями, такими как Service Workers. Fetch также обеспечивает единое логическое место для определения других связанных с HTTP понятий, такие как CORS и расширения для HTTP.
    // Fetch API встроена в браузер и работает на Promise.
    //API - интерфейс програмного обеспечения или приложения. Набор данных и возможностей, которыо епредоставляет нам какое-то решение.
    //Например, DOM API - различне методы, позволяющие работать с элементами на странице.
    // https://jsonplaceholder.typicode.com/ - небольшая база данные в формате JSON, к которой можно обращаться и тестировать ресурсы.
    /*
    //fetch();
    fetch('https://jsonplaceholder.typicode.com/todos', { //делаем запрос к todos (url). Из этой конструкции возвращаеются promise.
        //Задаём настройки - метод и body (которое отправляем).
        method: "POST",
        body: JSON.stringify({ //Отправляем JSON данные.
            name: 'Alex'
        }),
        headers: { //Заголовки, какой контент мы отправляем.
            'Content-type': 'application/json'
        }
    }) 
    .then(response => response.json()) //Получаем ответ в формате JSON. response.json() - превращает полученные данные в формат объекта javascript, но response.json() возвращает promise.
    .then(json => console.log(json));
    */

    //Обращаемся к локальной БД.
    fetch('http://localhost:3000/menu')
        .then(data => data.json()) //Берём объект из сервера и превращаем его в js объект.
        .then(res => console.log(res)); //выведем результат в консоль.
    //Результат. Получены данные для получения карточек меню. Меню - массив, который содержит отдельные объекты. Получаем массив данных. Если бы обращались на прямую к файлу fetch('db.json'), то получали бы объект, так как там объекты.
        // (3) [{…}, {…}, {…}]
        //     0: {img: "img/tabs/vegy.jpg", altimg: "vegy", title: "Меню 'Фитнес'", descr: "Меню 'Фитнес' - это новый подход к приготовлению б… продукт с оптимальной ценой и высоким качеством!", price: 9}
        //     1: {img: "img/tabs/post.jpg", altimg: "post", title: "Меню 'Постное'", descr: "Меню 'Постное' - это тщательный подбор ингредиенто… за счет тофу и импортных вегетарианских стейков.", price: 14}
        //     2: {img: "img/tabs/elite.jpg", altimg: "elite", title: "Меню 'Премиум'", descr: "В меню 'Премиум' мы используем не только красивый … фрукты - ресторанное меню без похода в ресторан!", price: 21}
        //     length: 3
        //     __proto__: Array(0)

    //Установка локального json-сервера требуется для отправки даннызх на локальный сервер и записи этих данных в файл db.json в раздел requests. То есть требуется поддержка POST запросов.
    //Информация о JSON-сервере https://github.com/typicode/json-server
    //Запуск JSON-сервера. json-server src/db.json
    // npx json-server --watch src/db.json
    // npx json-server --watch db.json --port 3000

    /*
    //------------------------------ Слайдер. Вариант №1 -------------------------//
    let slideIndex = 1; //Определяет текущее положение слайда. Изначально №1.
    const slides = document.querySelectorAll('.offer__slide'), //Родительский элемент каждого отдельного слайда.
        prev = document.querySelector('.offer__slider-prev'), //Стрелка влево.
        next = document.querySelector('.offer__slider-next'), //Стрелка вправо.
        total = document.querySelector('#total'), //Номер слайда "Всего" 04/#total.
        current = document.querySelector('#current'); //Номер текущего слайда #current/04.
    
    //Инициализируем слайдер. Чтобы он превратился в нужную структуру.
    showSlides(slideIndex);

    //Определяем общее количество слайдов.
    if (slides.length < 10) { //Если количество элементов .offer__slide меньше 10.
        total.textContent = `0${slides.length}`; //Возвращаем количество слайдов с добавлением 0 и записываем в тег с #total.
    } else {
        total.textContent = slides.length; // Возвращаем количество слайдов, не подставляя 0 вначале и записываем в тег с #total.
    }

    // Функция по показу и скрытию слайдов.
    function showSlides(n) { //В n приходит slideIndex.
        if (n > slides.length) { //Если номер текущего слайда больше, чем последняя граница, больше чем количество слайдов вообще в слайдере.
            slideIndex = 1; //Устанавливаем номер слайда в 1.
        }
        if (n < 1) { //Если номер текущего слайда меньше, чем передняя граница, меньше чем количество слайдов вообще в слайдере., то
            slideIndex = slides.length; //Устанавливаем номер слайда в последний элемент в слайдерах.
        }

        slides.forEach((item) => item.style.display = 'none'); //Прописываем для каждого .offer__slide стили display = 'none'.

        slides[slideIndex - 1].style.display = 'block'; // Берём нужный слайд .offer__slide и показываем его. [slideIndex - 1] - так как счёт с 0 и slides это массив. Для slideIndex прописывыем стили display = 'block'.
        
        //Определяем текущее количество слайдов.
        if (slides.length < 10) { //Если количество элементов .offer__slide меньше 10.
            current.textContent =  `0${slideIndex}`; //Возвращаем текущий слайд slideIndex с добавлением 0 и записываем в тег с #current.
        } else {
            current.textContent =  slideIndex; // Возвращаем текущий слайд, не подставляя 0 вначале и записываем в тег с #current.
        }
    }

    function plusSlides (n) {
        showSlides(slideIndex += n); //slideIndex увеличен на n. Если +, то прибаляем единицу, если приходит отрицательное значение, то отнимаем единицу. И после этого вызывается функция showSlides с необходимым числом.
    }

    // Назначаем обработчиков событий на prev и next.
    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });
    */

    /*
    //------------------------------ Слайдер-карусель. Вариант №2 -------------------------//
    // Есть большая обёртка .offer__slider-wrapper. Для неё назначим свойство overflow = 'hidden', есть всё, что не подходит под ширину блока .offer__slider-wrapper будет скрыто для пользователя. Следующий блок .offer__slider-inner будет в виде карусели. Он займёт столько места, сколько слайдов в ширину (у нас 4 слайда и блок будет занимать 400% от ширины одного слайда который есть на странице). Когла будем нажимать кнопки "вперёд" и "Назад" слайды будут передвигаться по отношению к .offer__slider-wrapper (при помощи свойства transform = `translateX(-${offset}px)`).
    
    let offset = 0; //Определяет текущий отступ слайда.
    let slideIndex = 1; //Определяет текущее положение слайда. Изначально №1.

    const slides = document.querySelectorAll('.offer__slide'), //Родительский элемент каждого отдельного слайда.
        prev = document.querySelector('.offer__slider-prev'), //Стрелка влево.
        next = document.querySelector('.offer__slider-next'), //Стрелка вправо.
        total = document.querySelector('#total'), //Номер слайда "Всего" 04/#total.
        current = document.querySelector('#current'), //Номер текущего слайда #current/04.
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Обёртка для слайдов (для тега с классом .offer__slider-inner). Родительский элемент всех слайдов.
        width = window.getComputedStyle(slidesWrapper).width, //Метод Window.getComputedStyle() возвращает объект, содержащий значения всех CSS-свойств элемента, полученных после применения всех активных таблиц стилей, и завершения базовых вычислений значений, которые они могут содержать. Получаем ширину width окошка .offer__slider-wrapper, через которое отображаются слайды.
        slidesField = document.querySelector('.offer__slider-inner'); // Обёртка для слайдов (для тега с классом .offer__slide)

    //Определяем общее количество слайдов.
    if (slides.length < 10) { //Если количество элементов .offer__slide меньше 10.
        total.textContent = `0${slides.length}`; //Возвращаем количество слайдов с добавлением 0 и записываем в тег с #total. Cвойство length объекта, который является экземпляром типа Array , устанавливает или возвращает число элементов этого массива. 
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length; // Возвращаем количество слайдов, не подставляя 0 вначале и записываем в тег с #total.
        current.textContent =  slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //Устанавливаем ширину блока .offer__slider-inner в 100%*4слайда = 400%. 
    slidesField.style.display = 'flex'; //Устанавливаем все слайды в одну строку.
    slidesField.style.transition = '0.5s all'; //Задержка в 0.5s.

    slidesWrapper.style.overflow = 'hidden'; //Ограничиваем показ внутри .offer__slider-wrapper.

    slides.forEach(slide => { //перебираем все .offer__slide (Родительский элемент каждого отдельного слайда).
        slide.style.width = width; //для каждого .offer__slide устанавиваем ширину в window.getComputedStyle(slidesWrapper).width.
    });

    next.addEventListener('click', () => { //Нажимаем на кнопку "Вперёд".
        //Механизм изменения offset и его проверки.
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) { //Сдвигаем слайд. Если отступ offset равен ширине одного слайда (ширину преобразуем в число и убираем ддва последних символа, например, было '500px', стало 500) * 4слайда, значит долистали до конца и нужно вернуться в самое начало. То есть, если ширина достигла 1950px.
            offset = 0; //Возвращаемся в начало.
        } else {
            offset += +width.slice(0, width.length - 2); //Добавляем смещение +650px. Записываем значение в offset. 
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Обращаемся к .offer__slider-inner. Трансформируем элемент по оси x. Используем знак "-" для сдвига в минус. 

        if (slideIndex == slides.length) { //Если текущий слайд равен количеству слайдов на странице всего, то
            slideIndex = 1; //Установить текущий слайд в 1.
        } else {
            slideIndex++; //Иначе добавляем к текущему слайду 1.
        }

        if (slides.length < 10) { //Если количество слайдов меньше 10
            current.textContent =  `0${slideIndex}`; //Установить текущий слайд в 0+номер текущего слайда в тегах html.
        } else {
            current.textContent =  slideIndex; // Иначе указываем просто текущий слайд в тегах html.
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); //Устанавливаем в 1950px.
        } else {
            offset -= +width.slice(0, width.length - 2); // offset = offset - +width.slice(0, width.length - 2).
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { //Если текущий слайд  равен 1, то
            slideIndex = slides.length; //Устанавливаем текущий слайд в количество слайдов "Всего".
        } else {
            slideIndex--; //Иначе уменьшаем текущий номер слайда на 1.
        }

        if (slides.length < 10) { //Если количество слайдов меньше 10, то
            current.textContent =  `0${slideIndex}`; //Указываем в тегах 0+текущйи слайд html.
        } else {
            current.textContent =  slideIndex; //Иначе указываем в тегах номер текущего слайда html.
        }
    });
    */

    // ---- Слайдер-карусель с точками-слайдами. Вариант №3 ---- //

    // Получаем, как элемент весь слайдер, включая индикаторы и всё остальное. Устанавливаем position: relative (точки должны быть абсолютно спозиционированы и прикреплены к низу). Затем с помощью цикла необходимо сощдавать количество точек, равное количеству слайдов, чтобы было чёткое соответствие. Каждой точке устанавливается характерный признак(атрибут), для того, чтобы связять конкретную точку с конкретным слайдом. Так же нужно создать класс активности, чтобы чётко понимать какой слайд сейчас активен. При клике на точку, перемещаемся на соответвующий слайд.
    
    let offset = 0; //Определяет текущий отступ слайда.
    let slideIndex = 1; //Определяет текущее положение слайда. Изначально №1.

    const slides = document.querySelectorAll('.offer__slide'), //Родительский элемент каждого отдельного слайда.
        slider = document.querySelector('.offer__slider'), //Родительский элемен всего слайдера, включая кнопки навигации.
        prev = document.querySelector('.offer__slider-prev'), //Стрелка влево.
        next = document.querySelector('.offer__slider-next'), //Стрелка вправо.
        total = document.querySelector('#total'), //Номер слайда "Всего" 04/#total.
        current = document.querySelector('#current'), //Номер текущего слайда #current/04.
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Обёртка для слайдов (для тега с классом .offer__slider-inner). Родительский элемент всех слайдов.
        width = window.getComputedStyle(slidesWrapper).width, //Метод Window.getComputedStyle() возвращает объект, содержащий значения всех CSS-свойств элемента, полученных после применения всех активных таблиц стилей, и завершения базовых вычислений значений, которые они могут содержать. Получаем ширину width окошка .offer__slider-wrapper, через которое отображаются слайды.
        slidesField = document.querySelector('.offer__slider-inner'); // Обёртка для слайдов (для тега с классом .offer__slide)

    //Определяем общее количество слайдов.
    if (slides.length < 10) { //Если количество элементов .offer__slide меньше 10.
        total.textContent = `0${slides.length}`; //Возвращаем количество слайдов с добавлением 0 и записываем в тег с #total. Cвойство length объекта, который является экземпляром типа Array , устанавливает или возвращает число элементов этого массива. 
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length; // Возвращаем количество слайдов, не подставляя 0 вначале и записываем в тег с #total.
        current.textContent =  slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //Устанавливаем ширину блока .offer__slider-inner в 100%*4слайда = 400%. 
    slidesField.style.display = 'flex'; //Устанавливаем все слайды в одну строку.
    slidesField.style.transition = '0.5s all'; //Задержка в 0.5s.

    slidesWrapper.style.overflow = 'hidden'; //Ограничиваем показ внутри .offer__slider-wrapper.

    slides.forEach(slide => { //перебираем все .offer__slide (Родительский элемент каждого отдельного слайда).
        slide.style.width = width; //для каждого .offer__slide устанавиваем ширину в window.getComputedStyle(slidesWrapper).width.
    });

    slider.style.position = 'relative'; //Устанавливаем для .offer__slider position = 'relative'.

    //Создаём большую обёртку для всех слайдов и стилизуем её.
    const indicators = document.createElement('ol'), //Блок с точками для слайдов.
          dots = []; //Истинный массив, в котором можем использовать push.
    indicators.classList.add('carousel-indicators'); //Класс для блока с точками для слайдов.
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Добавляем стили для класса carousel-indicators
    slider.append(indicators); //Помещаем .carousel-indicators внутрь .offer__slider.

    for (let i = 0; i < slides.length; i++) { //Цикл закончится тогда, когда закончаться сллайды.
        const dot = document.createElement('li'); //Создаём точки (li).
        dot.setAttribute('data-slide-to', i + 1); //Индикатор соответвия, например первая точка ведёт к первому слайду. .setAttribute() - Добавляет новый атрибут или изменяет значение существующего атрибута у выбранного элемента. Каждой токе устанавливаем атрибут data-slide-to, и устанавливаем нумеруацию, начиная с 1.
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) { //Если итерация первая, то 
            dot.style.opacity = 1; //Обращаемся к li и добавляем ему стиль opacity = 1.
        }
        indicators.append(dot); //Добавляем li в ol
        dots.push(dot); //Помещаем li в массив dots. В итоге получаем массив с точками.
    }

    next.addEventListener('click', () => { //Нажимаем на кнопку "Вперёд".
        //Механизм изменения offset и его проверки.
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) { //Сдвигаем слайд. Если отступ offset равен ширине одного слайда (ширину преобразуем в число и убираем ддва последних символа, например, было '500px', стало 500) * 4слайда, значит долистали до конца и нужно вернуться в самое начало. То есть, если ширина достигла 1950px.
            offset = 0; //Возвращаемся в начало.
        } else {
            offset += +width.slice(0, width.length - 2); //Добавляем смещение +650px. Записываем значение в offset. 
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Обращаемся к .offer__slider-inner. Трансформируем элемент по оси x. Используем знак "-" для сдвига в минус. 

        if (slideIndex == slides.length) { //Если текущий слайд равен количеству слайдов на странице всего, то
            slideIndex = 1; //Установить текущий слайд в 1.
        } else {
            slideIndex++; //Иначе добавляем к текущему слайду 1.
        }

        if (slides.length < 10) { //Если количество слайдов меньше 10
            current.textContent =  `0${slideIndex}`; //Установить текущий слайд в 0+номер текущего слайда в тегах html.
        } else {
            current.textContent =  slideIndex; // Иначе указываем просто текущий слайд в тегах html.
        }

        dots.forEach(dot => dot.style.opacity = ".5"); //Перебираем массив dots. Каждой точке устанавливаем стили в opacity = ".5".
        dots[slideIndex-1].style.opacity = 1; //Устанавливаем для dots номер текущего слайда - 1 в opacity = 1.
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); //Устанавливаем в 1950px.
        } else {
            offset -= +width.slice(0, width.length - 2); // offset = offset - +width.slice(0, width.length - 2).
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { //Если текущий слайд  равен 1, то
            slideIndex = slides.length; //Устанавливаем текущий слайд в количество слайдов "Всего".
        } else {
            slideIndex--; //Иначе уменьшаем текущий номер слайда на 1.
        }

        if (slides.length < 10) { //Если количество слайдов меньше 10, то
            current.textContent =  `0${slideIndex}`; //Указываем в тегах 0+текущйи слайд html.
        } else {
            current.textContent =  slideIndex; //Иначе указываем в тегах номер текущего слайда html.
        }

        dots.forEach(dot => dot.style.opacity = ".5"); //Перебираем массив dots. Каждой точке устанавливаем стили в opacity = ".5".
        dots[slideIndex-1].style.opacity = 1; //Устанавливаем для dots номер текущего слайда - 1 в opacity = 1.
    });

    dots.forEach(dot => { //Для массива dots, в котором содержатся li.
        dot.addEventListener('click', (e) => { //На каждую точку навешиваем обработчик события клика.
            const slideTo = e.target.getAttribute('data-slide-to'); //Используем объект события. Получаем атрибут data-slide-to.

            slideIndex = slideTo; //Номер слайда устанавливаем в data-slide-to, то есть кликнули на data-slide-to=4, текущий слайд установился в 1.
            offset = +width.slice(0, width.length - 2) * (slideTo - 1); //Берём общую ширину слайда * на номер li (data-slide-to).

            slidesField.style.transform = `translateX(-${offset}px)`; //Устанавливаем смещение для слайдера.

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5"); //Перебираем массив dots. Каждой точке устанавливаем стили в opacity = ".5".
            dots[slideIndex-1].style.opacity = 1; //Устанавливаем для dots номер текущего слайда - 1 в opacity = 1.
        });
    });
});



