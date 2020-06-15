'use strict';


const btn = document.querySelector('button');

//Устаревший формат.
// btn.onclick = function () {
//     alert('Ты нажал меня!');
// };

btn.addEventListener('click', () => {
//    console.log('Ты нажал меня!');
}); //следить за элементом button. Если произошло событие, запустить обработчик.
// можно назначать несколько действий на клик.
btn.addEventListener('click', () => {
//    console.log('Это второе действие от клика!');
});

// Событие передаётся как аргумент в callback-функцию и передаётся первым аргументом (e).
// Если нужно добавить ещё аргументов, то добавляем их через запятую.
// btn.addEventListener('mouseenter', (e) => {
//     console.log(e.target); //Можно найти событие и элемент для которого сработало событие.
//     e.target.remove();
//     // console.log('Hover эффект!');
// });

let i = 0;
const deleteElement = (e) => {
    console.log(e.target); //Для вложенных элементов, для которых нахначено одно событие использовать currentTarget.
    e.target.remove();
    i++;
    if (i == 1) {
        btn.removeEventListener('click', deleteElement);
    }
};

btn.addEventListener('click', deleteElement);

//Отмена стандартного поведения браузера.
const link = document.querySelector('a');
link.addEventListener('click', (e) => {
    e.preventDefault(); //Отменяет стандартное поведение браузера. Прописывается в начале.
    console.log(e.target);
});

// Назначаем события на все элементы.
const btns = document.querySelectorAll('button');
btns.forEach(btns => {
    btns.addEventListener('click', deleteElement, {once: true});
}); //перебираем элементы.

//Опции события.
// btns.addEventListener('click', deleteElement, {once: true});
// {once: true} - опция события.
// Boolean указывает, что слушатель должен быть вызван не более одного раза после добавления.
// Если true, слушатель автоматически удаляется при вызове.
