"use strict";
// ------------------------------------------------------------------------------------------------ //
// Какое будет выведено значение: let x = 5; alert( x++ ); ?
let x = 5; alert( x++ );
// Будет выведено 5, так как сначала выводится переменная, потом увеличивается значение.
// Если бы было таким образом ++x, то переменная сначала бы увеличилась на 1, потом вывелась.

// ------------------------------------------------------------------------------------------------ //
// Чему равно такое выражение: [ ] + false - null + true ?
console.log([ ] + false);   //"false"
console.log([ ] + false - null + true);   //"NaN"

// ------------------------------------------------------------------------------------------------ //
// Что выведет этот код: let y = 1; let x = y = 2; alert(x); ?
/*
let y = 1;
let x1 = y = 2; //переменной y присваивается 2, переменной x1 назначается значение переменной у, то есть 2.
alert(x1); //Выведется число 2.
*/

// ------------------------------------------------------------------------------------------------ //
// Чему равна сумма [ ] + 1 + 2?
console.log([ ] + 1 + 2); //к строке прибавляется 1, затем рядом приставляется 2. То есть получаем 12.

// ------------------------------------------------------------------------------------------------ //
// Что выведет этот код: alert( "1"[0] )?
alert( "1"[0] );
//К каждому элементу строки можно обратиться по его индексу. В данном случае нулевой индекс это 1, то есть выведется 1.
alert( "9,93"[2] ); // В таком случае обращение к 3му элементу, то есть отобразится 9.

// ------------------------------------------------------------------------------------------------ //
// Чему равно 2 && 1 && null && 0 && undefined ?
console.log(2 && 1 && null && 0 && undefined);
// && обрабатывает все аргументы слева на право. 2 и 1 - правдивое выражение. null - ложное выражение.
// Опрератор && останавливается на ложных выражениях, то есть в данном случае выведется null.
// Дальше код не пойдёт. Отработал оператор return и вернулся null.
// Аналогично работает или ||, только он запинается на правде.

// ------------------------------------------------------------------------------------------------ //
// Есть ли разница между выражениями? !!( a && b ) и (a && b)?
// console.log(!!( 1 && 2 ) === (1 && 2)); //false. Два эти выражения не равны.
// !! - превращает в булиновое значение. Булиновое значение не равно number.

// ------------------------------------------------------------------------------------------------ //
// Что выведет этот код: alert( null || 2 && 3 || 4 ); ?
alert( null || 2 && 3 || 4 );
// Смотреть таблицу приоритетов операторов. По приориетам сначала выполняется &&.
// То есть сначал сравнивается 2 && 3, получаем 3, дальше идёт сравнение с null и он сравнивается с 3.
// || запинается на правде. Поэтому при сравнении null и 3 снова получаем 3, так как null это false.
// Далее идёт сравнение 3 и 4, но так как 3 идёт левее, а || запинается на правде, то и выводится 3.

// ------------------------------------------------------------------------------------------------ //
// a = [1, 2, 3]; b = [1, 2, 3]; Правда ли что a == b ?
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(a == b); //false
//a не равно b, так как это разные переменные, хоть они и содержат одинаковые данные.

// ------------------------------------------------------------------------------------------------ //
// Что выведет этот код: alert( +"Infinity" ); ?
alert( +"Infinity" );
// Тип данных число, но выведет Infinity.

// ------------------------------------------------------------------------------------------------ //
// Верно ли сравнение: "Ёжик" > "яблоко"?
console.log("Ёжик" > "яблоко"); //false
// Осуществляется посимвольное сравнение.

// ------------------------------------------------------------------------------------------------ //
// Чему равно 0 || "" || 2 || undefined || true || falsе ?
console.log(0 || "" || 2 || undefined || true || false); //2
// 0 || "" || 2 - из это правда только 2, далее код не пойдёт, так как ИЛИ запинается на правде.
