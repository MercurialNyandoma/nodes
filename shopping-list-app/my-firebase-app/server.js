// server.js
const express = require('express');
const cors = require('cors');
const db = require('./firebase'); // Подключаем Firebase

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // Для обработки JSON в теле запросов
app.use(cors()); // Для поддержки кросс-доменных запросов

// Получение списка покупок
app.get('/api/shopping-list', async (req, res) => {
  try {
    const snapshot = await db.ref('shoppingList').once('value');
    const data = snapshot.val();
    const shoppingList = data ? Object.values(data) : [];
    res.json(shoppingList);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving shopping list', error: err });
  }
});

// Добавление товара в список покупок
app.post('/api/shopping-list', async (req, res) => {
  const { item } = req.body;

  if (!item) {
    return res.status(400).json({ message: 'Item is required' });
  }

  try {
    const newItemRef = db.ref('shoppingList').push();
    await newItemRef.set({ item, completed: false });
    res.status(201).json({ id: newItemRef.key, item, completed: false });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item', error: err });
  }
});

// Удаление товара из списка
app.delete('/api/shopping-list/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.ref(`shoppingList/${id}`).remove();
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
});

// Обновление статуса товара
app.put('/api/shopping-list/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    await db.ref(`shoppingList/${id}`).update({ completed });
    res.status(200).json({ id, completed });
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
