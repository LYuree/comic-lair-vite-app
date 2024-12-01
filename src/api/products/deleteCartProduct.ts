import axios from "axios";
import authHeader from "../../services/auth-header";
import validateSession from "../../services/jwtDecode";


// export const deleteCartProduct = async (userId: string, cartProductId: string) : Promise<string|undefined> => {
//     // вариант с бэкендом - VSCode требует указание <string | UNDEFINED>...
//     try {
//         await validateSession();
//         await axios.delete<string>(
//             `https://backend.example/api/cart/delete`,
//             {
//                 data: {
//                     userId,
//                     cartProductId
//                 }
//             }
//         )
//         .then(response => JSON.stringify(response.data));
//     }
//     catch(error){
//         console.log(`Error deleting a cart product: ${error}`)
//         if(error.response.status === 401){
//              AuthService.logout();
//              setShowModeratorBoard(false);
//              setShowAdminBoard(false);
//              setCurrentUser(undefined);     
//         }
//         return Promise.reject(error);
//     }

// вариант на моках
export const deleteCartProduct = async (userId: string, cartProductId: string) : Promise<boolean> => {
    console.log(`Запрос на удаление товара из корзины, userId: ${userId}, itemId: ${cartProductId}`);
    return new Promise(resolve => resolve(true));
}