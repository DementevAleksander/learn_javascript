'use strict';

// LocalStorage - Объект, встроенный в браузер и хранящий различные данные. Свойство глобального объекта window. Для уникального домена, служит для хранения локльных данных.
//Фалй можно найти на вкладке "Application".

//Записываем новый ключ.
localStorage.setItem('number', 5); // Отправляем данные. В localStorage записывается в поле key (название ключа) = 'number', в поле value=5 (значение ключа). Если значние уже есть, то оно перезапишется.
localStorage.getItem('number'); //Получаем данные.
console.log(localStorage.getItem('number')); //В консоле 5.

localStorage.removeItem('number');//Удаляем ключ.
console.log(localStorage.getItem('number')); //В консоле null.

//localStorage.clear(); //Полная очистка локального хранилища.

const checkbox = document.querySelector('#checkbox'), //Поле "галка".
      form = document.querySelector('form'), //Форма
      change = document.querySelector('#color'); //кнопка меняющая цвет.

//Когда пользователь заходит на страницу, выполняется автоматическая проверка, и если isChecked = true, то проставляется галочка.

if (localStorage.getItem('isChecked')) { //Если isChecked = true, то
    checkbox.checked = true; //устанавливаем галочку.
}

if (localStorage.getItem('bg') === 'changed') { //Если в localStorage есть параметр bg=changed.
    form.style.backgroundColor = 'red'; //Изменить цвет на красный.
}

checkbox.addEventListener('change', () => {
localStorage.setItem('isChecked', true); //Изменяем локальное хранилище при клике на галочку. Записываеися isChecked = true.
});

//Изменяем цвет. Есть ли параметр в localStorage. Если нет, то окрашиваем кнопку. Если же в localStorage уже есть параметр, то перекрашиваем форму обратно в белый цвет и удаляем item из localStorage.

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed') { //Если в localStorage есть параметр bg=changed.
        localStorage.removeItem('bg');//Удаляем ключ.
        form.style.backgroundColor = '#fff'; //Изменить цвет на белый.
    } else {
        localStorage.setItem('bg', 'changed'); //Устанавливаем параметр bg=changed.
        form.style.backgroundColor = 'red'; //Изменить цвет на красный.
    }
});

const persone = {
    name: 'Alex',
    age: 25
};
const serializedPersone = JSON.stringify(persone); //перевоим объект в формат JSON.
console.log(serializedPersone); //{"name":"Alex","age":25}
localStorage.setItem('Alex', serializedPersone); //помещаем JSON данные в localStorage.
console.log(JSON.parse(localStorage.getItem('Alex'))); //Конвертируем обратно в формат объекта JavaScript.
// age: 25
// name: "Alex"
// __proto__: Object