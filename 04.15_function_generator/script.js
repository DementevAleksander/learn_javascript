'use strict';
// Функция-генератор.
function* generator() { //Последовательный вызов. При первом вызове может вызываться первый функцияонал, при последующем другой. За это отвечает ключевае слово yield.
    yield 'С';
    yield 'а';
    yield 'ш';
    yield 'а';
}
const str = generator(); 
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next().value);
console.log(str.next());

//Когда функция срабатывает она отдаёт объект с двумя свойствами value и done.
// В консоле:
// { value: 'С', done: false }
// { value: 'а', done: false }
// { value: 'ш', done: false }
// а
// { value: undefined, done: true }

function* count(n) { 
    for (let i = 0; i < n; i++) {
        yield i;
    }
}
// const counter = count(7);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);

// В консоле:
// 0
// 1
// 2

// Чтобы запустить функцию-генератор максимальное количетсво раз можно обернуть в цикл.
for (let k of count(7)) {
    console.log(k);    
}
// В консоле:
// 0
// 1
// 2
// 3
// 4
// 5
// 6