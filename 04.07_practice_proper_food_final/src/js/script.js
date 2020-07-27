'use strict';
window.addEventListener('DOMContentLoaded', () => { //Загружаем DOM структуру.
    //Импортируем все модульные файлы в текущий.
    const cacl = require('./modules/cacl'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');
    
    cacl();
    cards();
    modal();
    forms();
    slider();
    tabs();
    timer();
});



