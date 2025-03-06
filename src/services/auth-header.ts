// возвращает заголовок для axiosConfig.headers для отправки запросов на сервер

import { rootStore } from "../store";

export default function authHeader() {
  // const userStr = localStorage.getItem("user");
  const {
    profileStore : { currentUserToken }
  } = rootStore;
  
  if (currentUserToken){
    return { Authorization: 'Bearer ' + currentUserToken}; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { Authorization: '' }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}