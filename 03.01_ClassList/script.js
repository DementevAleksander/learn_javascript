'use strict';
// Получаем кнопки
const btn = document.querySelectorAll('button');
console.log(btn[1].classList.length);
//classList получаем классы у конкретной кнопки. length - количество, в данном случае классов.
console.log(btn[1].classList.item(1));
//.item() - получить класс, который располагается под определённым индексом.
console.log(btn[2].classList.add('red', 'next_class'));
// .add() - добавить класс для конкретного элемента.
console.log(btn[1].classList.remove('blue'));
// .remove() - удалить класс для конкретного элемента.
console.log(btn[1].classList.toggle('blue'));
// .toggle() - если есть класс на элементе, то класс будет убран, если его нет, то наоборот добавлен.

// .contains() - позволяет проверять наличие класса на определённом элементе определённого класса
// и возвращает булиновое значение. Если класс есть, то возвращает true, если нет, то false.
if (btn[2].classList.contains('red')) {
    console.log('red');
}

btn[0].addEventListener('click', () => { //при клике на первую кнопку.
    if (!btn[2].classList.contains('red')) { //проверяем первую button, есть ли у неё класс red.
        // дословно - для button нет класса red.
        btn[2].classList.add('red'); // если класса red нет, то добавляем его.
    } else {
        btn[2].classList.remove('red'); // если класс red есть, то убираем его.
    }

    // Альтернативный вариант использовать .toggle(), но он не всегда подходит в крупных проектах.
    console.log(btn[4].classList.toggle('red'));
});

//.className - устаревшее значение. Не использовать.
console.log(btn[1].className);

//------- Делегирование событий -----//
const wrapper = document.querySelector('.btn-block');
wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.tagName == 'BUTTON') { //Если нажат элемент с тегом button, и он внутри .btn-block.
    // Вместо .tagName == 'BUTTON' можно использовать .matches("button.red") более продвинутый способ (сравнение).
    //if (event.target && event.target.classList.contains('red')) {
        //Если нажат элемент с классом red, и он внутри .btn-block.
        console.dir(event.target); //посмотреть event.target в качестве объекта.
    }
});
const btn2 = document.createElement('button'); //создаём новый элемент с тегом button.
btn2.classList.add('red', 'some'); //добавляем для вновь добавленного элемента button класс red.
wrapper.append(btn2); //помещаем элемент вконец структуры с классом .btn-block.