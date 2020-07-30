'use strict';
// запуск программы через 2 секунды.
const timerId = setTimeout(function (text) {
    console.log(text);
}, 2000, 'Чё-то жарко...'); //Фнкция, задержка, аргумент.

//Можно передавать уже готовую функцию.
const timerId1 = setTimeout(logger, 3000); //Фнкция, задержка.
function logger() {
    console.log('Чё-то жарко 2...');
}
//Сбросить setTimeout().
clearInterval(timerId1); //передаём идентификатор таймера.

const btn = document.querySelector('.btn');
let timerId2, //для того, чтобы останавливать Timeout или Interval.
    i=0;
btn.addEventListener('click', () => {
    timerId2 = setInterval(logger1, 1000); //функция выполняется с заданной периодисностью.
});

//В функции looger отслеживаем сколько раз повторился интервал.
function logger1() {
    //если i=3 очищаем интервал и останавливаем цикл.
    if (i === 3) {
        clearInterval(timerId2); //передаём идентификатор таймера.
    }
    console.log('Чё-то жарко 3...');
    i++;
}

//Чем рекурсивный TimeOut лучше, чем setInterval.
// Рекурсия - функция сама себя внутри вызывает. SetTimeOut может внутри себя вызвать ещё один SetTimeOut.
// Когда закончится внешний, запустится внутренний и т.д.
// Когда таймер с интервалом setInterval работает, он не учитывает как долго будет работать функция внутри него.
// То есть тяжёлая функция может выполняться секунду, а задержка в пол секудны, что некорректно.

/*
//Рекурсиный setTimeOut.
let id = setTimeout(function log() {
    console.log('Здрасссьсэ!');
    id = setTimeout(log, 1000);
}, 1000);

//Анимация.
function myAnimation() { //устаревший метод.
    const elem = document.querySelector('.box');
    let pos = 0;
    const id2 = setInterval(frame, 10); //Запускаем функцию с заданной периодичностью.
    function frame() {
        if (pos == 300) { //когда pos равно 300px
            //clearInterval(id2); //останавливаем анимацию.
            pos = 0; //Запускаем анимацию заново.
        } else {
            pos++; 
            elem.style.top = pos + "px"; //увеличиваем значение css top для .box на 1px.
            elem.style.left = pos + "px"; //увеличиваем значение css left для .box на 1px.
        }
    }
}
btn.addEventListener('click', myAnimation);
*/

const elem = document.querySelector('.box');  
let pos = 0;

function myAnimation() {
    pos++;
    elem.style.top = pos + "px";
    elem.style.left = pos + 'px';

    if (pos < 300) {
        requestAnimationFrame(myAnimation); //Запуск анимации.
    }
}

btn.addEventListener('click', () => requestAnimationFrame(myAnimation));

let id = requestAnimationFrame(myAnimation);
cancelAnimationFrame(id);