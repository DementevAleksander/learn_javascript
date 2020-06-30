'use strict';
//создаём новую дату
const now = new Date(); //текущая дата и время (системные).
// new Date.parse('2020-01-01'); // аналогичный способ с const now = new Date();
console.log(now);

//выводим конкретную дату в круглых скобках. Первый способ.
const now1 = new Date('9999-12-31');
console.log(now1);

//выводим конкретную дату в круглых скобках. Второй способ.
const now2 = new Date(2020, 5, 1, 20); //счтё с 0, учитвыется +3 часа часовой пояс.
console.log(now2);

console.log(now.getFullYear()); //получить текущий год.
console.log(now.getMonth()); //получить текущий месяц.
console.log(now.getDate()); //получить текущую дату.
console.log(now.getDay()); //получить номер дня недели, начиная с воскресенья.
console.log(now.getHours()); //Текущее время (часов) местное.
console.log(now.getUTCHours()); //Ткущее время по UTC.

console.log(now.getTimezoneOffset()); //Получаем разницу между текущим поясом и UTC. Разница в минутах.
console.log(now.getTime());// Возвращает TimeStap - количество милисекунд с 1970 года.

//Установка даты/времени
console.log(now.setHours(18)); //Устанавливаем время (часы).
console.log(now);

//Использование дат для измерения промежутков времени.
let start = new Date(); //Берём текущую дату.
//Засекаем время выполнения действия.
for (let index = 0; index < 10000000; index++) {
    const element = index ** 3; //возводим index в степень (**) 3.
}
//Засекаем время, когда цикл кончится
let end = new Date();
//Смотри разницу в датах в милисекундах
alert(`Цикл отработал за ${end - start} милисекунд!`);
// Этот подход называется banchmark, когда проверям производительность.

