// firebase.js
const admin = require('firebase-admin');

// Загружаем файл с учетными данными (замените на путь к вашему файлу JSON)
const serviceAccount = require('./nodes-df734-firebase-adminsdk-a71gw-ca5efa6795.json');

// Инициализация Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nodes.firebaseio.com' // Замените на ваш URL базы данных
});

// Получаем доступ к Realtime Database
const db = admin.database();

module.exports = db;
