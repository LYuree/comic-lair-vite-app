import axios from "axios";
import { cartProducts } from "../../utils/cartProducts";

// export const setCartProductAmount = async (userId: string, itemId: string, newAmount: number): Promise<boolean> => {
//     // Версия для работы с бэком
//         try {
//             await axios.put(
//                 'https://backend.example/api/cart/put',
//                 {
//                     userId,
//                     itemId,
//                     newAmount
//                 })
//                 .then((response) => response.data);
//                 return new Promise(resolve => resolve(true));

//         } catch (error) {
//             console.error(`Error updating cart product amount: ${error}`);
//             return new Promise(resolve => resolve(false));
//         }
// };

// версия для работы на моках... а нужна ли?..
// надо разбираться, как писать в JSON-файл - а мы в любом случае скоро будем запросы на бэк отправлять

export const setCartProductAmount = async(userId: string = "", itemId: string, newAmount: number): Promise<boolean> => {
    console.log(`Запрос на обновление кол-ва товара в корзине, userId: ${userId}, itemId: ${itemId}, newAmount: ${newAmount}`);
    return new Promise(resolve => resolve(true));
}