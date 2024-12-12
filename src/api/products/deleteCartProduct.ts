import axios from "axios";
import authHeader from "../../services/auth-header";
import validateSession from "../../services/validateSession";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";



// export const deleteCartProduct = async (userId: string, cartProductId: string) : Promise<string|undefined> => {
//     // вариант с бэкендом
//     const {profileStore : {
//         currentUser, setCurrentUser,
//     }} = rootStore;
//     try {
//         // await validateSession();
//         const headers = authHeader();
//         const data = {
//             userId,
//             cartProductId,
//         };
//         await axios.delete<string>(
//             `http://127.0.0.1:8000/carts/delete`,
//             {
//                 headers,
//                 data
//             }
//         )
//         .then(response => JSON.stringify(response.data));
//     }
//     catch(error: any){
//         console.log(`Error deleting a cart product: ${error}`)
//         if(error.response.status === 401){
//              AuthService.logout();
//             //  setShowModeratorBoard(false);
//             //  setShowAdminBoard(false);
//              setCurrentUser(null);     
//         }
//         return Promise.reject(error);
//     }

// вариант на моках
export const deleteCartProduct = async (userId: number, cartProductId: number) : Promise<boolean> => {
    console.log(`Запрос на удаление товара из корзины, userId: ${userId}, itemId: ${cartProductId}`);
    return new Promise(resolve => resolve(true));
}