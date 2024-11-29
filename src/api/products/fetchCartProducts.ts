import { ProductsData } from "./fetchProducts"
import { cartProducts } from "../../utils/cartProducts"
import * as AuthService from "../../services/auth.service";

// Версия для работы с бэком
// export const fetchCartProducts = async (): Promise<ProductsData> => {
//     try {
//         await axios.get<ProductsData>(
//             'https://backend.example/api/cart/get',
//              axiosConfig: {
//                      headers: authHeader()
//              })
//             .then((response) => response.data);
//
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         if(error.response.status === 401){
//              AuthService.logout();
//              setShowModeratorBoard(false);
//              setShowAdminBoard(false);
//              setCurrentUser(undefined);     
//         }
//         return Promise.reject({
//             error
//         });
//     }
// };

// Версия для моков
export const fetchCartProducts = async (): Promise<ProductsData> =>
    await new Promise(resolve => {
            resolve(cartProducts)
    })
