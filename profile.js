// Инициализация Auth0
const auth0 = await createAuth0Client({
  domain: 'dev-un7tb14m78hbi6t1', // Замените на ваш домен
  clientId: '5oq6dTjJefzEPI8XVlyOfQFSbiqySTHE',  // Замените на ваш Client ID
});
// Логика аутентификации
async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

// Логика выхода
async function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// Проверка авторизации и получения данных пользователя
async function handleAuth() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0.getUser();
    document.querySelector('.page-header').innerText = `Welcome, ${user.name}`;
  } else {
    login();
  }
}

// Запускаем проверку аутентификации при загрузке страницы
window.addEventListener('DOMContentLoaded', handleAuth);
