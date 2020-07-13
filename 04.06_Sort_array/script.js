'use strict';

// .forEach() - только перебирает массив, но никогда его не возвращает. Перебирает элементы.

//Фильтры разбираемые в этом уроке возвращают новый массив данных, то есть изменённый.

//filter - фильтрует внутри массива.
//создаём массив.
const names = ['Inan', 'Ann', 'Ksenia', 'Voldemart'];
//Получаем все имена, которые меньше 5 символов. Фильтруем элементы и получаем количество символов в каждом из этих элементов.
//Филтры можно затавать в виде функций. Получаем новый массив.
const shortNames = names.filter(function (name) {//Перебериает элементы и возвращает те, которые подходят под условия. name - каждый элемент массива.
      return name.length < 5; //Возвращаем элементы, длина которых меньше 5 символов.
}); 
console.log(shortNames);

//map - позволяет взять элемент и изменить его внутри массива. На выходе получается новый массив с изменёнными данными.
const answers = ['InAn', 'ANN', 'KsEnia', 'VoLDemart'];
const result = answers.map(item => {
      return item.toLocaleLowerCase(); //Перевести в нижний регистр.
}); 
console.log(result);

//Каждый раз задавать переменную необязательно. Можно взять исходный массив и поместить в тот массив, который получится после выполнения действий. Но с точки зрения программирования так делать нежелательно, лучше создавать отдельную переменную.
// let answers1 = ['InAn', 'ANN', 'KsEnia', 'VoLDemart'];
// answers1 = answers1.map(item => {
//       return item.toLocaleLowerCase(); //Перевести в нижний регистр.
// }); 
// console.log(answers1);

//every/some.
//some - берёт массив, перебирает его и если есть хотя бы один элемент подходит под заданное условие, он возвращает true, если нет, то false. Возвращают булиновое значение.
//every - если все элементы внутри нашего массива подходит под это условие, то только в таком случае метод вернёт true.
const some1 = [4, 'ANN', 'KsEnia', 'VoLDemart'];
//Проверим, есть ли в массиве хотя бы одно число.
console.log(some1.some((item) => {
      return typeof(item) === 'number';
})); //true
console.log(some1.every((item) => {
      return typeof(item) === 'number';
})); //false

//reduce - схлопыват/собирает массив в одно единое целое. Особенно это касается числовых данных.
const numders = [4, 5, 1, 7, 2, 11111];
//получаем сумму всех этих элементов.
const result1 = numders.reduce((sum, current) => { //sum - сумма всех элементов, при первом проходе равно 0. current - каждый элемент приходящий из массива. Например, пи первом проходе sum=0, current=4, 0+4=4. При втором проходе sum=4, current=5, 4+5=9. ПРи третьем проходе sum=9, current=1, 9+1=10 и т.д. sum=10, current=7, 10+7=17...
      return sum + current;
});
console.log(result1); //11130

//Массив со строками так же можно собрать воедино.
const food = ['apple', 'orange', 'beer'];
//получаем общую строку, в которой через запятую будут содержаться вся еда.
const result2 = food.reduce((sum, current) => { 
      //return sum + ', ' + current; //первый способ
      //второй способ - интерполяция
      return `${sum}, ${current}`;
});
console.log(result2); //apple, orange, beer

//В reduce можно задавать начальное значение.
const numders1 = [4, 5, 1, 7, 2, 10000];
//получаем сумму всех этих элементов.
const result3 = numders1.reduce((sum, current) => sum + current, 111); //111 - начальное значение.
console.log(result3); //10130

//Практический пример.
const obj = {
      ivan: 'persone',
      ann: 'persone',
      dog: 'animal',
      cat: 'animal'
};
//Задача - вытащить имена из объекта.
// метод entries() - взять объект и превратить его в матрицу. Массив массивов.
const newArr = Object.entries(obj);
console.log(obj); //{ ivan: 'persone', ann: 'persone', dog: 'animal', cat: 'animal' }
console.log(newArr);
// [
//       [ 'ivan', 'persone' ],
//       [ 'ann', 'persone' ],
//       [ 'dog', 'animal' ],
//       [ 'cat', 'animal' ]
// ]
const newArr1 = Object.entries(obj)
.filter(item => item[1] === 'persone') //Фильтруем. обращаемся ко второму элементу массива. Если второй элемент равен 'persone', то только такие элементы я возвращаю.
.map(item => item[0]); //.map - берём исходный массив и трансформируем его, получаем новый массив. Внутри нового массива получаем только имена, только первые элементы.
console.log(newArr1); //[ [ 'ivan', 'persone' ], [ 'ann', 'persone' ] ]




