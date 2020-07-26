//Система модулей CommonJS
function myModule() { //функция в отдельном файлике. Необходимо чтобы эта функция перешла из файла main.js в index.js.
    this.hello = function () {
        console.log('Привет из файла main.js!');
    };

    this.goodbye = function () {
        console.log('Пока из файла main.js!');
    };
}

//Синатксис CommonJS.
module.exports = myModule; //Устанавливаем функцию на экспорт.
