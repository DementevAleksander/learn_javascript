'use strict';
const box = document.querySelector('.box'),
      width = box.clientWidth, //видимая ширина, не включая margin и полосу прокрутки.
      height = box.clientHeight; //видимая высота, не включая margin и полосу прокрутки.
console.log(width, height);
// Если используется box-sizing: border-box; то padding включается в width. Например, если width: 400px; а padding: 10px;, то при свойстве box-sizing: border-box; общая ширина будет 400px, иначе 410px.

const width1 = box.offsetWidth, //видимая ширина.
      height1 = box.offsetHeight; //видимая высота.
console.log(width1, height1);

const width2 = box.scrollWidth, //полная ширина, не включая margin и полосу прокрутки.
      height2 = box.scrollHeight; //полная высота.
console.log(width2, height2);

//При нажатии на кнопку раскрываем полностью текст.
const btn = document.querySelector('button');
btn.addEventListener('click', () => { //после нажатия на кнопку
    //Модифицируем бокс.
    //box.style.height = box.scrollHeight + 'px'; //устанавливаем стиль для .box, как полная высота в px.
    console.log(box.scrollTop); //показать сколько текста было пролистано в скрытой части бокса.
});

//Получаем координаты элемента.
console.log(box.getBoundingClientRect());
//bottom - считается от верхнего края страницы до нижней границы элемента. В CSS - от нижней страницы браузера до нижней границы элемента.
//right - считается от левого края страницы до правой границы элемента. В CSS - от правого края страницы до правого края элемента.
console.log(box.getBoundingClientRect().top); //получить только значение top.

//Получаем стили CSS, которые были применены на страницы.
const style = window.getComputedStyle(box); //Посмотреть стили, которые были применены к элементу, так же Computed есть в панели браузера. Данным методом можно только считать стили.
console.log(style.display); //Посиотреть свойство display.

//Метрики глобальных объектов.
document.documentElement.scrollTop = 0; //Задать значение для scrollTop.
window.scrollBy(0, 400); //переместится на 400px вниз от текущего положения.
window.scrollTo(0, 400); //переместится на 400px вниз от верхнего края страницы.