document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('addItem');
    const itemInput = document.getElementById('itemInput');
    const shoppingList = document.getElementById('shoppingList');
    const loginButton = document.getElementById('loginButton');

    let userId = localStorage.getItem('userId');
    let nickname = localStorage.getItem('nickname');

    // URL и ключ API для работы с Supabase
    const SUPABASE_URL = 'https://burlmyojejojycrerhya.supabase.co';
    const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cmxteW9qZWpvanljcmVyaHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzM0NTAsImV4cCI6MjA1MTgwOTQ1MH0.nk2Ndd8eeF-XEeVcwp_ras1MpsNeRAxQQOEDH_4QG2Y';

    // Функция для отправки данных в Supabase
    async function sendDataToSupabase(shopItem) {
        console.log('Sending data to Supabase...');
        console.log('UserId:', userId);
        console.log('Nickname:', nickname);
        console.log('Shop Item:', shopItem);

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    nickname: nickname,
                    item: shopItem
                })
            });

            const data = await response.json();
            console.log('Response from Supabase:', data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    // Функция для удаления товара из Supabase
    async function deleteItemFromSupabase(shopItem) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/items`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`
                },
                body: JSON.stringify({
                    user_id: userId,
                    item: shopItem
                })
            });

            const data = await response.json();
            console.log('Response from Supabase (delete):', data);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    // Обработчик добавления товара
    addItemButton.addEventListener('click', () => {
        const shopItem = itemInput.value.trim();
        if (shopItem) {
            // Отправляем данные в Supabase
            sendDataToSupabase(shopItem);
            addItemToList(shopItem);
            itemInput.value = '';  // Очищаем поле ввода
        }
    });

    // Функция для добавления элемента в список на странице
    function addItemToList(item) {
        const li = document.createElement('li');
        li.classList.add('shopping-item');
        li.textContent = item;

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Выполнено';
        doneButton.addEventListener('click', () => {
            li.classList.add('done');
            deleteItemFromSupabase(item);  // Удаляем товар из Supabase
            setTimeout(() => li.remove(), 500);  // Удаляем элемент через 500ms (время анимации)
        });

        li.appendChild(doneButton);
        shoppingList.appendChild(li);
    }

    // Логика авторизации через Telegram
    loginButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`https://api.telegram.org/bot7775515402:AAEAP3ohbtfD9ZSx3R6qphq7BtZh4zL1yT8/getUpdates`);
            const data = await response.json();

            if (data.result && data.result.length > 0) {
                const user = data.result[0].message.from;
                userId = user.id;
                nickname = user.username;

                // Сохраняем данные в localStorage для использования в дальнейшем
                localStorage.setItem('userId', userId);
                localStorage.setItem('nickname', nickname);

                alert(`Вы успешно авторизовались как ${nickname}`);
            } else {
                alert('Не удалось авторизоваться через Telegram');
            }
        } catch (error) {
            console.error('Error with Telegram authorization:', error);
        }
    });
});
