import axios from "axios";
import { ProductsData } from "./fetchProducts"

// версия для бэкенда
// export const checkout = async (userId: string, cartProducts: ProductsData): Promise<boolean> => {
//     try {
//         await axios.post(
//             'https://backend.example/api/cart/checkout',
//             {
//                 userId,
//                 cartProducts
//             }
//         )
//         return true;
//     }
//     catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// вариант на моках
export const checkout = async (userId: string, cartProducts: ProductsData) : Promise<boolean> => {
    console.log(`Запрос на оформление заказа, userId: ${userId}, cartProducts:`, cartProducts.data);
    return new Promise(resolve => resolve(true));
}