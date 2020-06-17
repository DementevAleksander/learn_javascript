"use strict";

// ----------------------- Типы данных и переменные ------------------------------------------------ //

let number = 5;  //number
console.log(number);

let text = 'Увау!';  //string
console.log(text);

let boolean = true;  //Boolean
console.log(true);

// console.log(null777); //null, script.js:12 Uncaught ReferenceError: null777 is not defined

let und; //undefined
console.log(und);

let obj = { //Object
    name: 'apple',
    weight: 200
};
console.log(obj.name);
// console.log(obj['name']);

let arr = ['plump.png', 'orange.jpg', 7777, 'apple.bmp', {}, []]; //Массивы[]
console.log(arr[1]);

alert ('Здравствуйте!');

const result = confirm('Прочитаете до конца?');
console.log(result);

const answer = +prompt("Сколько вам лет?", "");
console.log(answer + 5);

const answer2 = [];
answer2[0] = prompt("Вопрос 1?", "");
answer2[1] = prompt("Вопрос 2?", "");
answer2[2] = prompt("Вопрос 3?", "");
console.log(answer2);

const user = prompt("Как вас зовут?", "");
alert(`Привет, ${user}. Очень рады вас видеть на нашем сайте`);



// ----------------------- Операторы в JS ------------------------------------------------ //

let incr = 10,
    decr = 10;
incr++; //++ - оператор инкримента, то есть увеличение на единицу
decr--; //-- - оператор декримента, то есть уменьшение на единицу
console.log(incr);
console.log(decr);

console.log(5%2);

console.log(2+5 == 7); // true
console.log(2+5 == '7'); // true
console.log(2+5 === 7); // true
console.log(2+5 === '7'); // false

// let isChecked = false,
//        isClosed = false;
// console.log (isChecked || isClosed);

let isChecked = false,
    isClosed = true;
console.log (isChecked || !isClosed);

console.log(2+5*3 != 7); // true


// ----------------------- Условия ------------------------------------------------ //

if (4 == 9) {
    console.log('OK!');
} else {
    console.log('Error!');
}

const num = '50';

if (num < 30) {
    console.log('Меньше 30.');
} else if (num > 60) {
    console.log('Больше 60.');
} else {
    console.log('Где-то между 30и и 60и!');
}

//(num === 50) ? console.log('Верное условие, это 50.') : console.log('Не верное условие, это не 50.');

switch (num) {
    case '49':
        console.log('Не верно. 49 это не 50.');
        break; //ставится всегда для корректно работы.
    case '100':
        console.log('Не верно. 100 это не 50.');
        break;
    case '50':
        console.log('Верно. 50 это 50.');
        break;
    default: //если ни одно значение не подошло
        console.log('Ни одно из значений не подошло.');    
        break;
}

// ----------------------- Циклы ------------------------------------------------ //

let num3 = 50;
while (num3 <= 55) {
    console.log(num3);
    num3++;
}

do {
    console.log(num3);
    num3++;
}
while (num3 <= 55);

let num4 = 50;
for (let i = 1; i < 5; i++) {
     console.log(num4);
     num4++;
} 

//let num = 50;
for (let i = 1; i < 100; i++) {
    if (i === 10) {
        break; // остановка цикла, когда i = 10. То есть 10 уже не выведется, так как console.log(i); идёт после.
        // continue; // исключает значение указанное в if.
    }
     console.log(i);
} 


// ----------------------- Функции ------------------------------------------------ //

// function declaration.
//function имя (аргумент) {}. 
let num5 = 10;
function showFirstMessage(text) {
    console.log(text);
    num5 = 20;
    console.log(num5);
}
//вызов фукнции
showFirstMessage('Привет, Александр Андреевич! Мы вам очень рады!');
console.log(num5);

function calc(a, b) {
    return (a + b);
}
console.log(calc(10, 1));
console.log(calc(100, 1));
console.log(calc(1000, 1));

function ret() {
    let num = 50;
    // какая-то логика программы
    return num;
}
const anotherNum = ret();
console.log(anotherNum);

//function expressio.
const logger = function () {
    console.log("ПриветИК!");
};
logger();

// Стрелочные функции
const calculate = (a, b) => {
    return a + b;
};


// ----------------------- Методы и свойства строк и чисел -------------------------------------- //
//Строки
const str = "коЛЛичество СИМВолов";
//const arr = [1, 2, 7];
//console.log(str.length); //подсчёт количества символов
console.log(str.toUpperCase());
console.log(str.toLowerCase());

const food = "Вкусный бутербродище!";
console.log(food.indexOf("терб"));

const logg = "Привет, дружище!";
console.log(logg.slice(8, 17));
console.log(logg.substring(8, 17));
console.log(logg.substr(8, 8));

//Числа
const numb = 15.499999999999999999999999999999999999999999999999999999999999999;
console.log(Math.round(numb));

const weight = "145.3523523px";
console.log(parseInt(weight));
console.log(parseFloat(weight));


// ----------------------- Callback-Функция ------------------------------------------------ //
function first() {
    //выполнение действий
    setTimeout(function() {
        console.log(1);
    }, 1000);
}
function second() {
        console.log(2);
}

first();
second();

//Callback-Функция
function learnJS(lang, callback) {
    console.log(`Я учу: ${lang}`);
    callback();
}
function done() {
    console.log('Я прошёл этот урок.');
}
learnJS('JavaScript', done);

// ----------------------- Объекты, деструктуризация объектов ------------------------------------- //

const options = {
    name: 'text',
    width: 1024,
    height: 1024,
    colors: {
        border: 'black',
        bg: 'red'
    },
    // создание метода
    makeTest: function () {
        console.log("Test");
    }
};
options.makeTest(); //запускаем метод
const {border, bg} = options.colors; //диструктуризация
console.log(border);

console.log(Object.keys(options).length);
// console.log(options.name);
// delete options.name;
// console.log(options);

let counter = 0;
for (let key in options) {
    if (typeof(options[key]) === 'object') {
        for (let i in options[key]) {
            console.log(`Свойство ${i} имеет значение ${options[key][i]}`);
            counter++;        }
    } else {
        console.log(`Свойство ${key} имеет значение ${options[key]}`);
        counter++;
    }
}
console.log(counter);


// ----------------------- Массивы и псевдомассивы ------------------------------------- //

const arr1 = [1, 2, 3, 6, 8];
arr1.pop(); //удаляет последний элемент
arr1.push(10); //добавляет элемент
console.log(arr1);
console.log(arr1.length);

//перебор элементов массива, цикл работет до тех пор, пока не закончатся элементы массива.
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);   
}

//другой вариант
for (let value of arr) {
    console.log(value);
}

//3й вариант. item - элемент, который мы перебираем, i - номер по порядку, arr - ссылка на массив, который перебираем.
arr.forEach(function (item, i, arr) {
    console.log(`${i}: ${item} внутри массива ${arr}`);
});


const str4 = prompt("Вопрос?", "");
const products = str4.split(", "); //указывается разделитель через который указывается перечисление
products.sort(compareName); //сортировка в алфавитном порядке
console.log(products.join("; "));

function compareName(a, b) { //callback-функция для корректной сортировки числел
    return a - b;
}


// ----------------------- Передача по ссылке или по значению ------------------------------------- //

let a = 5,
    b = a;

b = b + 5;
console.log(b);
console.log(a);

// Тот же вариант с объектом
const obj3 = {
    a: 5,
    b: 10
};
const copy = obj3; //Объект не копируется, а передаётся ссылка на объек, при изменении copy меняется obj
copy.a = 11;
console.log(copy);
console.log(obj);

//Создание копии объекта
function copy3(mainObject) {
    let objCopy = {};
    let key;
    for (key in mainObject) {
        objCopy[key] = mainObject[key];
    }
    return objCopy;
}

const numbers = {
    a: 2,
    b: 5,
    c: {
        x: 7,
        y: 4
    }
};

const newNumbers = copy(numbers);
newNumbers.a = 10;
console.log(newNumbers);
console.log(numbers);

//Соединение объектов
const add = {
    d: 17,
    e: 20
};
console.log(Object.assign(newNumbers, add)); //numbers - указываем объект, в который помещаем, add - который помещаем

const clone = Object.assign({}, add);

clone.d = 20;
console.log(add);
console.log(clone);

//Создание копии массива
const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice();
newArray[2] = 'qwerty';
console.log(newArray);
console.log(oldArray);

// Spread оператор (ES6-ES9)
const video = ['youtube', 'vimeo', 'rutube'],
      blogs = ['wordpress', 'livejoutnal', 'blogger'],
      internet = [...video, ...blogs, 'vk', 'facebook'];

console.log(internet);
//... - объединение данных

//Ещё пример
function logger1(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
const num1 = [2, 5, 7];
logger1(...num1);

//Ещё пример
const array = ['a', 'b'];
const newArray2 = [...array];
console.log(newArray2);

//Ещё пример
const q = {
    one: 1,
    two: 2
};
const newObj = {...q};
console.log(newObj);



// ----------------------- Основы ООП. прототипно-ориентированное наследование --------------- //
let strNew = "some";
// let strObj1 = new String(strNew);
//Создаём новую строку на основании strNew. Метод на строке оборачивает строку в объект,
// потом использует метод, который есть у этого объекта, а потом возвращает всё обратно
console.log(typeof (strNew));
console.log(typeof (strObj1));

// __proto__ нследование
// const soldier - общее понятие, описывает всех солдат
const soldier = {
    health: 400,
    armor: 200,
    sayHello: function () {
        console.log("Hello, Tom!");
    }
};

//Третий вариант. Используем в реальных проектах.
const tom = Object.create(soldier); //Создаём прототим tom, который наследуется от soldier
console.log(tom.armor);
tom.sayHello();


const tom1 = {
    health: 100
};



//Первый вариант наследования. Устаревший формат, лучше не использовать.
//tom.__proto__ = soldier;
console.log(tom.armor);
tom.sayHello();



//Второй вариант. Современный формат.
Object.setPrototypeOf(tom, soldier); //1й объект-которому назначаем прототим, 2й-объект, прототип которого устанавливаем
console.log(tom.armor);
tom.sayHello();


// ----------------------- Динамическая типизация в JavaScript --------------- //
//String
// 1 Вариант. Устаревший.
console.log(typeof(String(null)));
console.log(String(null));
console.log(typeof(String(4)));

// 2 Вариант. Конкатенация.
console.log(typeof(5 + ''));

const numb5 = 5;
console.log("https://vk.com/catalog/" + numb5);

const fontSize = 26 + 'px';

//Number
// 1 Вариант. Устаревший.
console.log(typeof(Number('4')));

// 2 Вариант. Унарный плюс.
console.log(typeof(+'4'));

// 3 Вариант. Методы чисел, с помощью которых можно преобразовывать структуры в числа.
console.log(typeof(parseInt("15px", 10)));

let answer1 = +prompt("Hello!", "");
// всё, что получаем от пользователей, это всё строки.

//Boolean
// 1 Вариант. Нативный.
// False - 0, '', null, undefined, NaN; Остальное - True.
let switcher = null;
if (switcher) {
    console.log('Работает...');
} //Услвие не отработает, так как null это False.
switcher = 1;
if (switcher) {
    console.log('Работает2...');
} //Услвие  отработает, так как 1 это True.

// 2 Вариант.
console.log(typeof(Boolean('4')));
// 3 Вариант.
console.log(typeof(!!"4"));

let x = 5;
alert( x++ );