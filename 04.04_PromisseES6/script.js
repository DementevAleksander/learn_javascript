'use strict';
// Promise ES6 (дословно "Обещаение") - позволяет удобно работать с асинхронными операциями.
//Пример с асинхронным кодом.
console.log('Запрос данных....'); //синхронный, выполняется сразу.
setTimeout(() => { //запускается через две секунды. Колбеки позволяют задавать порядок действий.
      console.log('Подготовка данных через 2 секунды....');
      const product = {
            name: 'TV',
            price: 2000
      };
      setTimeout(() => {
            product.status = 'order';
            console.log(product);
      }, 2000);
}, 2000);

//Чтобы каждый раз не задавать колбек-функции, нужны Promise ES6.
const req = new Promise(function (resolve, reject) { // Создаём Promise(). resolve, reject Означают функции, которые мы можем потом передавать. resolve - что-то выполнилось правильно, то есть обещание выполнено. reject - обещание не выполнено, что-то пошло не так.
//Когда мы создаём обещаение, мы предполагаем, что оно может завершиться, как положительно, так и отрицательно. Но в данный момент мы не знаем, как оно может завершиться, у нас есть определённый промежуток времени, до того, как получим рещультат. То же саме, что происходит с сервером, мы посылаем запрос на сервер и ждём ответа от него, мы не знаем, как ответит сервер, положительно или отрицатлно.
//Внутри промисса есть два аргумента resolve, reject, по факту это аргументы, вместо которых подставляются функции. Если всё отработало правильно, сервер ответил, то мы вызываем функцию resolve(). Если что-то пошло не так, то вызываем функцию reject(). 
      setTimeout(() => { //запускается через две секунды. Колбеки позволяют задавать порядок действий. Запускается setTimeout(), в нём действия, если всё выполнено правильно, то запускается следующий колбек, внктри setTimeout().
      //Имитация асинхронного кода. К примеру, сделали запрос на сервер. 
            console.log('Подготовка данных через 2 секунды....'); //После запуска setTimeout() "сервер" вернул сообщение.
            const product1 = { //После запуска setTimeout() "сервер" вернул такие-то данные.
                  name: 'TV',
                  price: 2000
            };
            // setTimeout(() => { //Заускается только при положительном исходе вышестоящего setTimeout(). Вот эту часть можено заменить функцией resolve.
            //       product1.status = 'order';
            //       console.log(product1);
            // }, 2000);
            resolve(product1); //Получили данные, то есть всё впорядке, вызываем функцию  resolve(), которая говори, что всё ОК.
      }, 2000); //Это произойдёт через 2 секунды.
});
req.then((product1) => { //then() - Выполняется на Promise, в случае положительного исхода. То есть это функция resolve. then() - для обработки положительного результата. Как аргумент указывается объект, указанный внутри resolve(), например resolve(product1).
      console.log('Данные получены.');
      setTimeout(() => {
            product1.status = 'order';
            console.log(product1);
      }, 2000);
});

//Ещё вариант использования then(). 
req.then((product1) => {
      const req2 = new Promise((resolve, reject) => {
            console.log('Данные получены.');
            setTimeout(() => {
                  product1.status = 'order';
                  resolve(product1);
            }, 2000);
      });
      req2.then(data => {
            console.log(data);
      });
});

//Преимущества промиссов перед колбэк функциями в том, что промиссы можно запускать/вызывать по цепочке, когда один выполнился, выполняется следующий.

//Ещё один вариант синтаксиса then().
req.then((product1) => {
      return new Promise((resolve, reject) => {
            console.log('Данные получены.');
            setTimeout(() => {
                  product1.status = 'order';
                  resolve(product1);
                  // reject(); //Если что-то пошло не так. Ссылка на reject() указывается вконце .catch(). При этом все .then() пропускаются.
            }, 2000);
      });
}).then(data => {
      data.modify = true; //Из колбек функций можно возвращать не только промиссы.
      return data;
}).then((data2) => { //Такой реализацией мы добиваемся последовательности выполнения кода.
      console.log(data2);
}).catch(() => { //При этом все .then() пропускаются.
      console.error('Призошла ошибка!');
}).finally(() => { //позволяет выполнить действия при любом исходе Promise.
      console.log('finally');
});

//В промиссах есть два метода all и race. На практике встречаются давольно часто.
const test = time => { //Такая функция нужна для запуска операций через определённый промежток времени.
      return new Promise ((resolve, reject) => {
            setTimeout(() => resolve(), time);
      });
};
// test(1000).then(() => {
//       console.log('1 секунда');
// });
// test(2000).then(() => {
//       console.log('2 секунда');
// });

//Promise.all - служит для того, чтобы убедиться, что все наши промисы выполнены. Например, мы подгружаем изображения с нескольких серверов, которые по разнуому дают отклик. При этом мы хотим, чтобы какие-то действия выполнялись только тогда, когда они будут получены с серверов.
Promise.all([test(1000), test(2000)]).then(() => { //принимает массив с промиссами.
      console.log('Promise.all');
});

//Promise.race выполняет действия, когда первый промисс отработал.
Promise.race([test(1000), test(2000)]).then(() => { //принимает массив с промиссами.
      console.log('Promise.race');
});
