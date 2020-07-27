function forms() {
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
}

module.exports = forms;