'use strict';
//Классы - обёртка функций-конструкторов. По сути классы - это всё те же функции. Можно сказать, что класс это шаблон. 
// Название классов задаётся с большой буквы. Rectangle - прямоугольник.
//Концепция - шаблон, по которому создаём что-то.
class Rectangle {
      //Для конструирования класса используется функция constructor.
      constructor(height, width) { //Аргументы приходят из вне при создании экземпляра класса.
            this.height = height;
            this.width = width;
      }
      //Создаём метод. Методов у класса много.
      //Считаем площадь прямоугольника.
      calcArea() {
            return this.height * this.width;
      }
}

//Помещаем объект, который создаётся при помощи класса.
const square = new Rectangle(10, 10); //Экземпляр объекта, созданный на основании концепции.
//В переменной square лежит объект, у которого есть два свойства и у него есть один метод calcArea().
console.log(square.calcArea());

const long = new Rectangle(20, 1000); //свойства передаваемые, как аргументы, запишутся именно в объет Rectangle(), содержащийся в строчке long.
console.log(long.calcArea());

//Принципы ООП:
//1. Абстракция - отделяем концепию от её экземпляра.
//2. Наследование - способность нашего объекта или класса базироваться на другом объекте или классе. Главный механизм для повторного кода. Наследование классов определяет иерархию.

//Для примера создадим ещё один класс.
class ColoredRectangleWithText extends Rectangle { //у этого класса будут такие же свойства, как и у Rectangle (та же ширина, таже высота). Делаем класс ColoredRectangleWithText наследуемым от Rectangle.
      //Для конструирования класса используется функция constructor.
      constructor(height, width, text, bgColor) { //Аргументы приходят из вне при создании экземпляра класса.
            super(height, width); //Главное правило -  super(); должно быть на первом месте. Вызывает супер конструктор родителя. В данном случае  super(height, width); повторяет this.height = height; и this.width = width;.
            this.text = text;
            this.bgColor = bgColor;
      }
      // Метод calcArea() наследуется.
      //Можно добавить новый метод.
      showMyProps() {
            console.log(`Текст: ${this.text}, Цвет: ${this.bgColor}`);
      }
}

const div = new ColoredRectangleWithText(25, 10, 'Привет, мир!', 'Зелёненький!');
div.showMyProps();
console.log(div.calcArea());
