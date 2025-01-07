document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('addItem');
    const itemInput = document.getElementById('itemInput');
    const shoppingList = document.getElementById('shoppingList');

    let userId = localStorage.getItem('userId');
    let nickname = localStorage.getItem('nickname');

    // URL и ключ API для работы с Supabase
    const SUPABASE_URL = 'https://burlmyojejojycrerhya.supabase.co';
    const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cmxteW9qZWpvanljcmVyaHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzM0NTAsImV4cCI6MjA1MTgwOTQ1MH0.nk2Ndd8eeF-XEeVcwp_ras1MpsNeRAxQQOEDH_4QG2Y';

    // Загружаем список покупок пользователя из Supabase
    async function loadShoppingList() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/items?user_id=eq.${userId}`, {
                headers: {
                    'Authorization': `Bearer ${SUPABASE_API_KEY}`
                }
            });

            const data = await response.json();
            data.forEach(item => {
                addItemToList(item.item); // Добавляем товар в список
            });
        } catch (error) {
            console.error('Error loading shopping list:', error);
        }
    }

    // Функция для добавления элемента в список
    function addItemToList(item) {
        const
