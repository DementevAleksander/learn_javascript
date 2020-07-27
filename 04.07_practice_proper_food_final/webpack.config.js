'use strict';

let path = require('path');

module.exports = {
  mode: 'development', //режим работы webpack. Про режими читать тут https://webpack.js.org/configuration/mode/    .
  entry: './src/js/script.js', //Файл, с которого начинаем сборку. Тут прописываются все зависимости. Если нужно использовать несколько файлов, то нужно создать объект.
  output: { // Файл выхода.
    filename: 'bundle.js', //Название файла.
    path: __dirname + '/src/js/' //Куда склываем итоговый файл.
  },
  watch: true, //true - webpack отслеживает изменение файлов и в автоматическом режиме собирает проект каждый раз, когда меняем файлы. Его можно конфигурировать.

  devtool: "source-map", //Ханит информацию о расположении исходников. Про devtool читать тут https://webpack.js.org/configuration/devtool/   .

  module: {} //Про модули читать тут  https://webpack.js.org/concepts/modules/   . Через запятую могут идти свойства плагина, но это используется редко, так как все необходимые плагины уе встроены.
};
