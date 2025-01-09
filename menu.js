document.querySelectorAll('#menu-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    switch (index) {
      case 0:
        window.location.href = 'index.html'; // Перенаправление на главную страницу
        break;
      case 1:
        window.location.href = 'shop-list.html'; // Перенаправление на страницу покупок
        break;
      case 2:
        window.location.href = 'calendar.html'; // Перенаправление на страницу календаря
        break;
      case 3:
        window.location.href = 'index.html'; // Перенаправление на страницу профиля
        break;
      default:
        console.error('Invalid menu button');
    }
  });
});
