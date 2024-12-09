import axios from "axios";
import authHeader from "../../services/auth-header";
import validateSession from "../../services/validateSession";


// export const setCartProductAmount = async (userId: string, itemId: string, newAmount: number): Promise<boolean> => {
//     // Версия для работы с бэком
//         try {
            // await validateSession();
//             await axios.put(
//                 'https://backend.example/api/cart/put',
//                 data: {
//                     userId,
//                     itemId,
//                     newAmount
//                 },
//                 axiosConfig: {
//                     headers: authHeader()
//                 })
//                 .then((response) => response.data);
//                 return new Promise(resolve => resolve(true));

//         } catch (error) {
//             console.error(`Error updating cart product amount: ${error}`);
//              if(error.response.status === 401){
//                  AuthService.logout();
//                  setShowModeratorBoard(false);
//                  setShowAdminBoard(false);
//                  setCurrentUser(undefined);     
//              }
//             return new Promise(resolve => resolve(false));
//         }
// };

// версия для работы на моках... а нужна ли?..
// надо разбираться, как писать в JSON-файл - а мы в любом случае скоро будем запросы на бэк отправлять

export const setCartProductAmount = async(userId: string = "", itemId: string, newAmount: number): Promise<boolean> => {
    console.log(`Запрос на обновление кол-ва товара в корзине, userId: ${userId}, itemId: ${itemId}, newAmount: ${newAmount}`);
    return new Promise(resolve => resolve(true));
}