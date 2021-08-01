import ReactDOM from 'react-dom';
import React, {useState, useEffect} from 'react';

// данные для примера, которые вообще-то должны браться из базы данных, например.
// содержат список категории и моделей
const data = [
    {
        id: 1,
        name: 'Легковые',
        models: [
            {
                id: 1,
                name: 'Alfa Romeo'
            },
            {
                id: 2,
                name: 'Aston Martin',
            },
            {
                id: 3,
                name: 'Aston Martin',
            },
            {
                id: 4,
                name: 'Bentley',
            },
        ]
    },
    {
        id: 2,
        name: 'Грузовые',
        models: [
            {
                id: 1,
                name: 'КамАЗ',
            },
            {
                id: 2,
                name: 'ГАЗ',
            },
            {
                id: 3,
                name: 'ЗИЛ',
            },
            {
                id: 4,
                name: 'УРАЛ',
            },
        ]
    }
];


// компонент пользовательского выпадающего списка
const CustomSelect = ({ id, options, onChange }) => {
  console.log("Это options:", id, options)
    return (
        <select className="custom-select" id={id} onChange={onChange}>
            { options.map((option, index) =>
                <option key={id + index} value={option.id}>{option.name}</option>
            ) }
        </select>
    )
}




// главный компонент приложения
const App = () => {

    const [ categories, setCategories ] = useState([]); // хранилище категорий
    const [ models, setModels ] = useState([]);         // хранилище моделей


    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        // устанавливаем категории
        if (data.legnth > 0 && data) {
          setCategories(data[0].name);
        }
        // setCategories(data.legnth > 0 && data);
        console.log("Это data:", data)

        // и модели из первой категории по умолчанию
        if (data.length > 0 && data[0].models && data[0].models.length > 0) {
          setModels(data);
        }
        // setModels(data.length > 0 && data[0].models && data[0].models.length > 0);
        // console.log("Это setModels:", data)

        // console.log("Это categories:", categories)
        // console.log("Это models:", models)

    }, []);


    // при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);

        // получаем из массива категорий объект категрии по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setModels(models);
    }


    return (
        <div className="container mt-5">

            <div className="row">
            <div className="form-group col-md-6">
                <label htmlFor="category">Категории</label>
                <CustomSelect id="category" options={categories} onChange={onCategoriesSelectChange}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="model">Марки</label>
                <CustomSelect id="model" options={models}/>
            </div>
            </div>
        </div>
    );
};



ReactDOM.render(<App />, document.getElementById('root'))