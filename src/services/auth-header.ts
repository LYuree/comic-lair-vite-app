// возвращает заголовок для axiosConfig.headers для отправки запросов на сервер

export default function authHeader() {
  // взять данные о пользователя (включая токен) из localStorage
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: '' }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}