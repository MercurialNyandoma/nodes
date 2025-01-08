// Функция для переключения дополнительных кнопок
function toggleButtons() {
    const extraButtons = document.getElementById('extraButtons');
    extraButtons.classList.toggle('active');
}

// Скрыть дополнительные кнопки при загрузке
window.onload = function() {
    const extraButtons = document.getElementById('extraButtons');
    extraButtons.classList.remove('active');
};

// Показать модальное окно для добавления покупки
document.getElementById('add-purchase').addEventListener('click', function() {
    document.getElementById('purchaseModal').style.display = 'flex';
});

// Функция для отправки текста и сохранения в localStorage
function submitPurchase() {
    const purchaseInput = document.getElementById('purchaseInput').value;
    if (purchaseInput) {
        let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push(purchaseInput);
        localStorage.setItem('purchases', JSON.stringify(purchases));

        alert('Текст отправлен: ' + purchaseInput);
        document.getElementById('purchaseModal').style.display = 'none';
        document.getElementById('purchaseInput').value = '';
    } else {
        alert('Пожалуйста, введите текст.');
    }
}

// Закрытие модального окна при клике на фон
window.onclick = function(event) {
    if (event.target === document.getElementById('purchaseModal')) {
        document.getElementById('purchaseModal').style.display = 'none';
    }
};
