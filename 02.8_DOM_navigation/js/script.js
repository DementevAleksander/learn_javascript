'use strict';
// Навигация по DOM дереву.
// console.log(document.head); //получаем струтктуру тега head
// console.log(document.body); //получаем струтктуру тега body
// console.log(document.documentElement); //получаем струтктуру всего документа HTML
console.log(document.body.childNodes); //получить все узлы DOM дерева, подчинённые body (только один уровень)
// тут можно посмотреть свойства узлов.
// + тестовая нода, которая появляется, когда элемент начинается с новой строки.
// DOM узел - каждая сущность на странице, это узел. Но не каждый узел элемент.
// console.log(document.body.firstChild);
// console.log(document.body.lastChild);

console.log(document.querySelector('#current').parentNode);
// Получаем селектор #current (кнопка). Для селектора получаем родительский узел (node).
console.log(document.querySelector('#current').parentNode.parentNode);
// Получаем селектор #current (кнопка). Для селектора получаем родительский узел (node) и ещё вышестоящий.

// data атрибуты. Записываются, как data-NAME.
// console.log(document.querySelector('[data-current="3"]')); // для получения атрибута исп. '[]', внутри название.
console.log(document.querySelector('[data-current="3"]').nextSibling); //Получаем следующий за data-current="3" узел.
console.log(document.querySelector('[data-current="3"]').previousSibling); // предшествующий data-current="3" узел.

// Чтобы не попадать на тектовый узел, а на конкретный элемент используется .nextElementSibling
console.log(document.querySelector('[data-current="3"]').nextElementSibling); // следующий элемент.
console.log(document.querySelector('#current').parentElement); //родительский элемент.
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);

//Аналог .childNodes. В этом случае forEach испоьзовать нельзя.
// Задача - перебрать все .childNodes и убрать все текстовые узлы.
for (let node of document.body.childNodes) { //каждый узел, лежащий внутри .body
    if (node.nodeName == '#text' || node.nodeName == '#comment') { //если свойство node (.nodeName) равна #text,
        continue; //то такое значение игнорировалось и цикл останавливается и начинается заново.
        // есть ещё оператор brake, который останавливает цикл полностью.
    }
    console.log(node);
}