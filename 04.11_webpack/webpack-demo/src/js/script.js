//Импортируем функцию myModule() из файла main.js.
const myModule = require('./main');

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
//Создаётся новый файл bundle.js и bundle.js.map с объединённым кодом в папке \...проект...\webpack-demo\dist\js\... (путь прописывается в файле с конфигурацией).

// webpack is watching the files…
// Hash: 7cf4608cb1b5f92cb75d
// Version: webpack 4.44.0
// Time: 333ms
// Built at: 2020-07-27 11:07:51
//         Asset      Size  Chunks                   Chunk Names
//     bundle.js  6.06 KiB    main  [emitted]        main
// bundle.js.map  5.96 KiB    main  [emitted] [dev]  main
// Entrypoint main = bundle.js bundle.js.map
// [./src/js/main.js] 549 bytes {main} [built]
// [./src/js/script.js] 1.51 KiB {main} [built]

// webpack.config.js - файл конфигурации.