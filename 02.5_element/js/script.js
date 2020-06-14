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
      wrapper = document.querySelector('.wrapper'),
      hearts = wrapper.querySelectorAll('.heart'), // получить .heart только внутри .wrapper.
      oneHeart = wrapper.querySelector('.heart'); // получить .heart только внутри .wrapper.
//или так      hearts = document.querySelectorAll('.heart'),
//или так      oneHeart = document.querySelector('.heart');

console.dir(box777); //Получить элемент в качестве объекта.

// box777.style.backgroundColor = 'yellow';
// box777.style.width = '500px';
box777.style.cssText = 'background-color: yellow; width: 1000px;';


btns[1].style.borderRadius = '100%';
circle777[0].style.backgroundColor = 'yellow'; //только для конкретных элементов.
circle777[2].style.backgroundColor = 'yellow'; //только для конкретных элементов.

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

const createDiv = document.createElement('div'); //создание элемента на странице. Создаётся только внутри файла JS.
//const text = document.createTextNode('Это я написал с JS!'); //текстовый узел,без оболочки тега.Использ. редко.

//Модификация класса CSS
createDiv.classList.add('black'); //Добавляем класс 'black'. Пока что только в файле JS.
document.body.append(createDiv); //Добавляем div в конец body.
wrapper.append(createDiv); //находим класс .wrapper и встаавляем div вконец.
wrapper.prepend(createDiv); //находим класс .wrapper и встаавляем div вначало.

hearts[1].before(createDiv); //вставляем div перед вторым элементом.
hearts[1].after(createDiv); //вставляем div после второго элемента.

// circle777[1].remove(); //Уалить.
hearts[1].replaceWith(circle777[2]); // Второй эемент сердца заменяется третим кружком (переставляется).


//Устаревшие конструкции, которые могут встретиться в существующих проектах.
wrapper.appendChild(createDiv); //находим класс .wrapper и встаавляем div вконец.
wrapper.insertBefore(createDiv, hearts[1]); //вставляем div перед вторым элементом сердца.
wrapper.removeChild(hearts[1]); //Указываем элемент для удаления
wrapper.replaceChild(circle777[0], hearts[0]); //1й аргумент чем заменяем, 2й аругмент что меняем.

//Текст
createDiv.innerHTML = "<h1>Привет!</h1>"; //Работает и с текстом и со структурой.
createDiv.textContent = "Текст контент!"; //Работает только с текстом. Больше подходит для ввода данных пользователем.

createDiv.insertAdjacentHTML("afterend", '<h2>Привет от insertAdjacentHTML</h2>');
//1й аргумент - , 2й аргумент - тот HTML код, который хотим вставить.
// beforebegin - вставить перед элементом.
// afterend - вставить после элемента.
// afterbegin - вставить внутрь элемента вначало.
// beforeend - вставить внутрь элемента вконец.
