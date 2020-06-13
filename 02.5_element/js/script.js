'use strict';

/*
//---------------------------------------------------------------------------------------------------//
// Устаревшие методы, но ещё встречаются в проектах.
//---------------------------------------------------------------------------------------------------//
// ID
const box777 = document.getElementById('box'); //сначала обращаемся к документу (объект).
// С помощью метода .getElementById() получаем эемент страницы с ID = box.
console.log(box777);

//---------------------------------------------------------------------------------------------------//
// Tags
const btns = document.getElementsByTagName('button');
// Важно. Получаем не один элемент, а массив данных - псевдомассив.
console.log(btns);

// Чтобы получить конкретныую кнопку, нужно указать индекс. Способ 1.
const btns1 = document.getElementsByTagName('button')[1];
console.log(btns1);

// Чтобы получить конкретныую кнопку, нужно указать индекс. Способ 1.
const btns2 = document.getElementsByTagName('button');
console.log(btns2[2]);

//---------------------------------------------------------------------------------------------------//
//Class
const circle777 = document.getElementsByClassName('circle');
console.log(circle777);

//---------------------------------------------------------------------------------------------------//
// Современные методы.
//---------------------------------------------------------------------------------------------------//
// CSS-селекторы.
const hearts = document.querySelectorAll('.heart');
// для селектора указывается точка. В случа рыботы с .querySelectorAll(). А для ID #.
// дополнительный + этого метода - появляется методв .forEach.
// console.log(hearts);
hearts.forEach(item => {
    console.log(item);
}); // поочерёдно перебрать все элементы массива. item - каждый элемент, который содержится в массиве.

//один селектор, первый элемент.
const oneHeart = document.querySelector('.heart');
console.log(oneHeart);
*/


const box777 = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circle777 = document.getElementsByClassName('circle'),
      hearts = document.querySelectorAll('.heart'),
      oneHeart = document.querySelector('.heart'),
      wrapper = document.querySelector('.wrapper');

console.dir(box777);

// box777.style.backgroundColor = 'yellow';
// box777.style.width = '500px';
box777.style.cssText = 'background-color: yellow; width: 1000px;';


btns[1].style.borderRadius = '100%';
circle777[0].style.backgroundColor = 'yellow'; //только для конкретных элементов.

/*
for (let i = 0; i < hearts.length; i++) {
// i = 0 - начинаем перебирать элементы по порядку, начиная с 0 индекса.
// i < hearts.length цикл работает до тех пор, пока не останется элементы внутри этого псевдомассива.
    hearts[i].style.backgroundColor = 'yellow';
//  hearts[i] в цикле плучаем элементы.   
}
*/

// Циклы используются крайне редко, так есть специальные перебирающие методы.
hearts.forEach(item => {
    item.style.backgroundColor = 'yellow';
});

const div = document.createElement('div'); //создание элемента на странице.
//const text = document.createTextNode('Это я написал с JS!'); //текстовый узел,без оболочки тега.Использ. редко.

//Модификация класса CSS
div.classList.add('black'); //Добавляем класс 'black'.
//Добавляем div в конец body.
document.body.append(div);

wrapper.append(div); //находим класс .wrapper и встаавляем div вконец.