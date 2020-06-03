"use strict";

// ----------------------- Типы данных и переменные ------------------------------------------------ //

// let number = 5;  //number
// console.log(number);

// let text = 'Увау!';  //string
// console.log(text);

// let boolean = true;  //Boolean
// console.log(true);

// console.log(null777); //null, script.js:12 Uncaught ReferenceError: null777 is not defined

// let und; //undefined
// console.log(und);

// let obj = { //Object
//     name: 'apple',
//     weight: 200
// };
// console.log(obj.name);
// console.log(obj['name']);

// let arr = ['plump.png', 'orange.jpg', 7777, 'apple.bmp', {}, []]; //Массивы[]
// console.log(arr[1]);

// alert ('Здравствуйте!');

// const result = confirm('Прочитаете до конца?');
// console.log(result);

// const answer = +prompt("Сколько вам лет?", "");
// console.log(answer + 5);

// const answer = [];
// answer[0] = prompt("Вопрос 1?", "");
// answer[1] = prompt("Вопрос 2?", "");
// answer[2] = prompt("Вопрос 3?", "");
// console.log(answer);

// const user = prompt("Как вас зовут?", "");
// alert(`Привет, ${user}. Очень рады вас видеть на нашем сайте`);



// ----------------------- Операторы в JS ------------------------------------------------ //

/*
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
*/

// ----------------------- Условия ------------------------------------------------ //
/*
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
*/

// ----------------------- Циклы ------------------------------------------------ //

// let num = 50;
// while (num <= 55) {
//     console.log(num);
//     num++;
// }

// do {
//     console.log(num);
//     num++;
// }
// while (num <= 55);

let num = 50;
for (let i = 1; i < 5; i++) {
     console.log(num);
     num++;
} 

//let num = 50;
for (let i = 1; i < 100; i++) {
    if (i === 10) {
        break; // остановка цикла, когда i = 10. То есть 10 уже не выведется, так как console.log(i); идёт после.
        // continue; // исключает значение указанное в if.
    }
     console.log(i);
} 




