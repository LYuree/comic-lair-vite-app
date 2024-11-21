import { ProductsData } from "./fetchProducts"
import { cartProducts } from "../../utils/cartProducts"

// Версия для работы с бэком
// export const fetchCartProducts = async (): Promise<ProductsData> => {
//     try {
//         await axios.get<ProductsData>(
//             'https://backend.example/api/cart/get')
//             .then((response) => response.data);
//
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         // Верните пустой массив ProductsData в виде обещания
//         return Promise.resolve({
//             data: []
//         });
//     }
// };

// Версия для моков
export const fetchCartProducts = async (): Promise<ProductsData> =>
    await new Promise(resolve => {
            resolve(cartProducts)
    })
