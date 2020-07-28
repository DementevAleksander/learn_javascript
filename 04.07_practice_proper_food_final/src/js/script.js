'use strict';

import cacl from './modules/cacl';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => { //Загружаем DOM структуру.
    //Импортируем все модульные файлы в текущий.
    // const cacl = require('./modules/cacl'),
    //       cards = require('./modules/cards'),
    //       forms = require('./modules/forms'),
    //       modal = require('./modules/modal'),
    //       slider = require('./modules/slider'),
    //       tabs = require('./modules/tabs'),
    //       timer = require('./modules/timer');
    
    //Вызываем модальное окно через промежуток времени.
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    cacl();
    cards();
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    tabs('.tabheader__item', '.tabcontent', '.tabheader', 'tabheader__item_active');
    timer('.timer', '2020-08-31');
    slider({ //реструктуризация.
        conteiner: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slider',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});



