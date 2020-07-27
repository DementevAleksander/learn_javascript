/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//Импортируем функцию myModule() из файла main.js.
const myModule = __webpack_require__(/*! ./main */ "./src/js/main.js");

//Используем функцию myModule() из файла main.js.
const myModuleInstance = new myModule();

myModuleInstance.hello();
myModuleInstance.goodbye();

//Браузер не умеет собирать модули самостоятельно.
// mkdir webpack-demo - создаём папку в проекте.
// cd webpack-demo - переходим в эту папку.
// npm init -y - устанавливаем (в корень проекта).
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map