// script.js

// Функция для загрузки списка из localStorage
function loadShoppingList() {
    const shoppingList = document.getElementById('shoppingList');
    // Получаем сохраненные товары из localStorage
    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Если есть сохраненные товары, добавляем их в список
    savedItems.forEach(itemText => {
        const newItem = document.createElement('li');
        newItem.classList.add('shopping-item');
        newItem.innerHTML = `
            ${itemText}
            <button class="doneButton">Выполнено</button>
        `;
        shoppingList.appendChild(newItem);

        // Добавляем обработчик для кнопки "Выполнено"
        newItem.querySelector('.doneButton').addEventListener('click', function() {
            newItem.classList.add('done'); // Применяем анимацию растворения
            setTimeout(() => {
                newItem.remove();
                saveShoppingList(); // Обновляем список после удаления
            }, 500); // Время анимации растворения
        });
    });
}

// Функция для сохранения списка в localStorage
function saveShoppingList() {
    const shoppingList = document.getElementById('shoppingList');
    const items = [];
    // Получаем все товары из списка
    shoppingList.querySelectorAll('.shopping-item').forEach(item => {
        items.push(item.firstChild.textContent.trim());
    });

    // Сохраняем массив в localStorage
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Добавление товара в список покупок
document.getElementById('addItem').addEventListener('click', function() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    // Если введен текст, добавляем товар в список
    if (itemText) {
        const shoppingList = document.getElementById('shoppingList');
        
        const newItem = document.createElement('li');
        newItem.classList.add('shopping-item');
        
        newItem.innerHTML = `
            ${itemText}
            <button class="doneButton">Выполнено</button>
        `;
        
        shoppingList.appendChild(newItem);
        itemInput.value = ''; // Очистить поле ввода после добавления

        // Добавляем обработчик для кнопки "Выполнено"
        newItem.querySelector('.doneButton').addEventListener('click', function() {
            newItem.classList.add('done'); // Применяем анимацию растворения
            setTimeout(() => {
                newItem.remove();
                saveShoppingList(); // Обновляем список после удаления
            }, 500); // Время анимации растворения
        });

        saveShoppingList(); // Сохраняем список после добавления
    }
});

// Загружаем список при старте страницы
window.onload = loadShoppingList;
