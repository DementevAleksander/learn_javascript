'use strict';
// 6 событий для мобильных браузеров.
// touchstart - событие возникает при косновении на элемент.
// touchmove - если палец касается элем. и начинает двигаться по нему,то при каждом смещ. пальца срабатывает touchmove.
// touchend - как только палец отпустил элемент срабатывает touchend.
// touchenter - ведём пальцем по экрану, и задевает элемент, на который назначено событие touchenter.
// touchleave - срабатывает когда палец ушёл за пределы элемента, на которое назначено событие touchleave.
// touchcansel - возникает тогда, когда точка соприкосновения больше не регистрируется на поверхнности.
// touchcansel - например, палец ушёл за пределы браузера.

window.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');
    box.addEventListener('touchstart', (e) => {
        e.preventDefault();
        console.log('Сработало событие touchstart!');
        console.log(e.touches);
    });

    box.addEventListener('touchmove', (e) => {
        e.preventDefault();
        //console.log('Сработало событие touchmove!');
        //отслеживаем движение touchmove.
        console.log(e.targetTouches[0].pageX);
        //обращаемся к порядковому номеру пальца, например первому, получаем координаты.
    });

    box.addEventListener('touchend', (e) => {
        e.preventDefault();
        console.log('Сработало событие touchend!');
    });
});

// 3 главных свойства при работе с сенсорными устройствами.
// touches - выдаёт список всех пальцев, которые взаимодействуют с экраном.
// targetTouches - выдаёт список всех пальцев, которые взаимодействуют с конкретным элеменом.
// changedTouches - список пальцев, участвующих в текущем событии. Например, если это событие touchend,
// то список будет содержать количество пальцев, которые были убраны, даже если пальцы убраны не все,
// то есть пальцы, совершившие действия.