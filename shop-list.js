// Получаем элементы
const addPurchaseBtn = document.querySelector('.add-purchase-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const submitBtn = document.getElementById('submit-btn');
const purchaseInput = document.getElementById('purchase-input');
const shoppingList = document.getElementById('shopping-list');

// Функция для обновления списка покупок на странице
function updateShoppingList() {
  const shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || [];
  shoppingList.innerHTML = ''; // Очищаем текущий список
  shoppingData.forEach((purchase, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('shopping-item');
    listItem.textContent = purchase;

    // Создаем кнопку удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    const deleteImg = document.createElement('img');
    deleteImg.src = 'delete.png';
    deleteImg.alt = 'Delete';
    deleteBtn.appendChild(deleteImg);
    deleteBtn.appendChild(document.createTextNode('Удалить'));

    // Обработчик для удаления элемента
    deleteBtn.addEventListener('click', () => {
      shoppingData.splice(index, 1); // Удаляем элемент из массива
      localStorage.setItem('shoppingData', JSON.stringify(shoppingData)); // Обновляем localStorage
      updateShoppingList(); // Обновляем список на странице
    });

    // Добавляем кнопку удаления в элемент списка
    listItem.appendChild(deleteBtn);
    shoppingList.appendChild(listItem);
  });
}

// Открыть модальное окно
addPurchaseBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
  modal.style.display = 'block';
});

// Закрыть модальное окно при клике на затемненный фон
modalOverlay.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
  purchaseInput.value = ''; // очищаем поле ввода
});

// Обработчик отправки данных
submitBtn.addEventListener('click', () => {
  const purchase = purchaseInput.value.trim();
  if (purchase) {
    // Сохраняем покупку в localStorage
    let shoppingData = JSON.parse(localStorage.getItem('shoppingData')) || [];
    shoppingData.push(purchase);
    localStorage.setItem('shoppingData', JSON.stringify(shoppingData));

    // Закрыть окно после отправки
    modalOverlay.style.display = 'none';
    modal.style.display = 'none';
    purchaseInput.value = ''; // очищаем поле ввода

    updateShoppingList(); // Обновляем список на странице
  } 
  // Если поле пустое, ничего не происходит
});

// Инициализация списка покупок при загрузке страницы
updateShoppingList();
