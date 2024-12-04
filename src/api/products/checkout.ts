import axios from "axios";
import { ProductsData } from "./fetchProducts"
import authHeader from "../../services/auth-header";
import validateSession from "../../services/validateSession";

// версия для бэкенда
// export const checkout = async (userId: string, cartProducts: ProductsData): Promise<boolean> => {
//     try {
//         await validateSession();
//         await axios.post(
//             'https://backend.example/api/cart/checkout',
//             data: {
//                 userId,
//                 cartProducts
//             },
//             axiosConfig: {
//              headers: authHeader(),
//             }
//         )
//         return true;
//     }
//     catch (error) {
//         console.log(error);
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
export const checkout = async (userId: string, cartProducts: ProductsData) : Promise<boolean> => {
    console.log(`Запрос на оформление заказа, userId: ${userId}, cartProducts:`, cartProducts.data);
    return new Promise(resolve => resolve(true));
}