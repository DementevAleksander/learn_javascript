//Импортируем функцию myModule() из файла main.js.
const myModule = require('./js/main');

//Используем функцию myModule() из файла main.js.
const myModuleInstance = new myModule();

myModuleInstance.hello();
myModuleInstance.goodbye();

//Браузер не умеет собирать модули самостоятельно.
// mkdir webpack-demo - создаём папку в проекте.
// cd webpack-demo - переходим в эту папку.
// npm init -y - устанавливаем.
// npm install webpack webpack-cli --save-dev - устанавливаем для работы в консоле.
// npx webpack - запуск сборщика из папки \...проект...\webpack-demo>npx webpack.
//Создаётся новый файл main.js с объединённым кодом в папке \...проект...\webpack-demo\dist\main.js
// Hash: 7db5feb93a91a06479d4
// Version: webpack 4.44.0
// Time: 395ms
// Built at: 2020-07-26 20:25:51
//   Asset      Size  Chunks             Chunk Names
// main.js  1.13 KiB       0  [emitted]  main
// Entrypoint main = main.js
// [0] ./src/index.js 428 bytes {0} [built]
// [1] ./src/js/main.js 549 bytes {0} [built]
