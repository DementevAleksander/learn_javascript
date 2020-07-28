//Импорт.
import {one, two} from './main';
console.log(`${one} and ${two}`); //Этот синтаксис нужно так же собирать сборщиком модулей.

//Импортированные переменные можно переименовать в текущем файле.
import {one as first} from './main';
console.log(first);

//Импортировать можно сразу всё.
import * as data from './main';
console.log(`${data.one} and ${data.two}`);
data.sayHi();