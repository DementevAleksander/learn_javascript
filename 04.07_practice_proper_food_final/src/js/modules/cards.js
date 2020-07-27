function cards() {
    //------------------------- Классы стандарт ES6. Карточки на сайте. ----------------------//
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
    // new MenuCard(
    //     "img/tabs/vegy.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
    //     "vegy",
    //     'Меню "Фитнес"', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9, //долларов. Число трансформируется через метод changeToRUB ().
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();
    // // Создаём ещё карточки. Пока что копируем. Но нужно уходить от копипаста и оптимизмровать код.
    // new MenuCard(
    //     "img/tabs/elite.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
    //     "elite",
    //     'Меню “Премиум”', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14, //долларов. Число трансформируется через метод changeToRUB ().
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg", //Рекуомндуется/чаще всего используются двойные кавычки.
    //     "post",
    //     'Меню "Постное"', //Если двойные кавычки есть в тексте, тогда используем одинарные кавычки.
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21, //долларов. Число трансформируется через метод changeToRUB ().
    //     '.menu .container',
    //     //'menu__item',
    //     //'big'
    // ).render();
}

module.exports = cards;