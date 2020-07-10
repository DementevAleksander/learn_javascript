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

    //Берём все формы и под каждую из них подвязываем postData().
    form.forEach(item => {
        postData(item);
    });

    function postData(form) {
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

            //Трансформируем formData в JSON формат.
            const object = {}; //Содали пустой объект.
            formData.forEach(function(value, key){
                object[key] = value;
            });
            

            fetch('server.php', { //делаем запрос к файлу server.php.
                //Задаём настройки - метод и body (которое отправляем).
                method: 'POST',
                headers: { //Заголовки, какой контент мы отправляем.
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object) //данные формы конвертируем в формат для JSON.
            })
            .then(data => data.text()) //При полоительном результате .text() задает или возвращает текстовое содержимое выбранных элементов.
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
});


