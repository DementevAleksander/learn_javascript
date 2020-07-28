//Модульная структура ModulesES6
//Экспорт. Первый вариант.
export let one = 1;

//Экспорт. Второй вариант.
let two = 2;
export{two}; //Именованный синтаксис.

export function sayHi() {
    console.log('Привет из файла sript.js');
}