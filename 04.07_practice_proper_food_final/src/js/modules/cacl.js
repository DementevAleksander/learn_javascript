function calc() {
    // Калькулятор калорий.
    const result = document.querySelector('.calculating__result span'); //Основной элемент, куда записывается результат вычислений (итоговое значение ккал).
    // let sex = 'female', //пол. Устанавливаем значение по умолчанию. Чтобы не приходилось нажимать на активный элемент.
    //     height, weight, age, //рост, вес, возраст.
    //     ratio = 1.375; //коэффициент активности. Устанавливаем значение по умолчанию.

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) { //Если в локальном хранилище есть ключ sex
        sex = localStorage.getItem('sex'); //то в переменную sex записываем значение ключа sex из локального хранилища.
    } else { //Иначе устанавливаем значения по умолчанию.
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) { //Если в локальном хранилище есть ключ ratio
        ratio = localStorage.getItem('ratio'); //то в переменную ratio записываем значение ключа ratio из локального хранилища.
    } else { //Иначе устанавливаем значения по умолчанию.
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //Функция подсчёта по формуле вычисления каллорий
    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { //Если не заполнено поля каким-нибудь значением
            result.textContent = '____'; // То выводим сообщение.
            return; //Это необходимо, чтобы прервать функцию.
        }
        if (sex === 'female') { //Если пол женский, то считаем по формуле.
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); //BMR = 447.6 + (9.2 x вес, кг) + (3.1 х рост, cм) – (4.3 х возраст, лет). И результат умножаем на коэффициент активности ratio.
            // Math.round() - округляем до целого значения.
        } else { //Иначе (мужской).
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); //BMR = 88.36 + (13.4 x вес, кг) + (4.8 х рост, см) – (5.7 х возраст, лет). И результат умножаем на коэффициент активности ratio.
        }
    }
    calcTotal();

    //Устанавливаем классы активности, в зависимаости от сохранённых значений в localStorage.
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector); //Элементы с которыми будем работать.

        elements.forEach(elem => { //Перебираем элементы.
            elem.classList.remove(activeClass); //Чистим класс актвивности. 
            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //Если кнопка с id совпадает с значением из localStorage (с ключом sex).
                elem.classList.add(activeClass); //Устанавливаем класс активности на той кнопке, которая нажата.
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //Если кнопка с атрибутом data-ratio совпадает с значением из localStorage (с ключом ratio).
                elem.classList.add(activeClass); //Устанавливаем класс активности на той кнопке, которая нажата.
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active'); // #gender div - элемент с которым работаем. calculating__choose-item_active - класс активности.
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // .calculating__choose_big div - элемент с которым работаем. calculating__choose-item_active - класс активности.

    //Получаем данные с элементов (статический контент).
    function getStaticInformation(selector, activeClass) { //функция будет применяться на нескольких элементах, потому требуется parentSelector. Так же требуется класс активности activeClass для окрашивания кнопок, которые были нажаты.
        const elements = document.querySelectorAll(selector); // Получаем все div внутри выбранного элемента.

        elements.forEach(elem => { //Перебираем все элементы. Используем делегирование событий.
            elem.addEventListener('click', (e) => { //Отслеживаем клики по родительскому элементу.
                if (e.target.getAttribute('data-ratio')) { //Если атрибут data-ratio присутсвует у объекта события. Это нужно, так как не у всех кнопок есть атрибут data-ratio.
                // getAttribute() возвращает значение указанного атрибута элемента. Если элемент не содержит данный атрибут, могут быть возвращены null или "" (пустая строка).
                    ratio = +e.target.getAttribute('data-ratio'); //устанавливаем значение ratio в значение, которое взяли у e.target, то есть в значение дата атрибута data-ratio.
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //Устанавливаем в параметр ratio со тем значением, которое вёл пользователь для поля с атрибутом data-ratio.
                } else {
                    sex = e.target.getAttribute('id'); //Если у элемента нет атрибута data-ratio, то этот впеременную "пол" записываем значение id элемента в который щёлкнули.
                    localStorage.setItem('sex', e.target.getAttribute('id')); //Устанавливаем в параметр sex с тем значением, которое вёл пользователь для поля с id.
                }
    
                elements.forEach(elem => { //перебираем все элементы.
                    elem.classList.remove(activeClass); // убираем класс активности.
                });
    
                e.target.classList.add(activeClass); //Добавляем класс активности.
    
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active'); //#gender - родительский элемент блока мужчина/женщина. .calculating__choose-item_active - класс активности.
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); //.calculating__choose_big - родительский элемент блока с коэффициентом активности.

    //Получаем данные с элементов (динамический контент, который вводит пользователь). 
    function getDynamicInformation(selector) { 
        const input = document.querySelector(selector); //Получаем данные с поля, которые заполнил пользователь.

        input.addEventListener('input', () => { //отслеживаем, когда пользователь вводит данные.
            if (input.value.match(/\D/g)) { //Если в поле введено что-то кроме чисел.
                input.style.border = "1px solid red"; //Подсвечиваем поле красным цветом.
            } else {
                input.style.border = 'none'; //Если введено число, то не подсвечиваем поле.
            }
            switch(input.getAttribute('id')) { //Проверяем есть ли у элемента атрибут id.
                case "height":
                    height = +input.value; //Записываем значение value, которое ввёл пользователь.
                    break; //Останавиваем кейс.
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;