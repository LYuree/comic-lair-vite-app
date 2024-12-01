import { jwtDecode } from 'jwt-decode';
import { getCurrentUser, logout } from './auth.service';
import axios from 'axios';


const validateSession = async () => {
    const user = getCurrentUser();
    if(!user ||
        !user.accessToken ||
        isTokenExpired(user.accessToken)){
        try {
            // запросить новый access-токен:
            // вместе с запросом отправляется HTTPOnly cookie
            // с refresh-токеном (если есть);
            // сервер должен проверить срок refresh-токена;
            // если валидный, вернуть новый access-токен;
            // иначе - выбросить пользователя из аккаунта
            const userRefreshed = await axios.post(
                'https://backend.example/api/jwt',
                {
                    user
                },
                {
                    withCredentials: true
                }
            )
            return userRefreshed;
        }
        catch (error: any){
            // logout();
            throw error;            
        }
    }
}

const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if(decodedToken.exp){
        return decodedToken.exp < currentTime;
    }
    else throw new Error("Custom error, decodedToken.exp is undefined.");
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export default validateSession;