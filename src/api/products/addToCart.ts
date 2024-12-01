import axios from "axios"
import authHeader from "../../services/auth-header";
import validateSession from "../../services/jwtDecode";



// вариант с рабочим бэкендом
// export const addToCart = async(userId: string, itemId: string, amount: number = 1): Promise<boolean> => {
//     try{
//         await validateSession();
//         await axios.post(
//             'https://backend.example/api/cart/add',
//             data: {
//                 userId,
//                 itemId,
//                 amount
//             },
//             axiosConfig: {
//              headers: authHeader(),
//              withCredentials: true
//             }
//         )
//         return true;
//     }
//     catch(error){
//         console.log(`Произошла ошибка при попытке добавления товара в корзину: ${error}
//             userId: ${userId}, itemId: ${itemId}, amount: ${amount}`);
//         if(error.response.status === 401){
//              AuthService.logout();
//              setShowModeratorBoard(false);
//              setShowAdminBoard(false);
//              setCurrentUser(undefined);     
//         }
//         return false;
//     }
// }

// вариант на моках
export const addToCart = async (userId: string, itemId: string, amount: number = 1): Promise<boolean> => {
    console.log(`Отправлен запрос на добавление товара в корзину: userId: ${userId} itemId: ${itemId} amount: ${amount}`);
    return new Promise(resolve => resolve(true));
}