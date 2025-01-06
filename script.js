// script.js

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

        // Обработчик нажатия на кнопку "Выполнено"
        newItem.querySelector('.doneButton').addEventListener('click', function() {
            newItem.classList.add('done'); // Применить анимацию растворения
            // Удалить элемент после завершения анимации
            setTimeout(() => {
                newItem.remove();
            }, 500); // 500ms — время анимации растворения
        });
    }
});
