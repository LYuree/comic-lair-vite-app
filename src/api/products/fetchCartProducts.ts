import { IProductItem, ProductsData, fetchProducts } from "./fetchProducts"
import { cartProducts } from "../../utils/cartProducts"
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import validateSession from "../../services/validateSession";
import axios from "axios";
import authHeader from "../../services/auth-header";

interface cartData {
        id: number;
        user_id: string;
        products: cartItem[];
}

export interface cartItem {
        quantity: number;
        product_id: number;
}

// Версия для работы с бэком


export const fetchCartProducts = async (): Promise<ProductsData> => {
    // dev mode
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify({id: "64a654593e91b8e73a351e9sdfsdf", name: "Mykytko", token: "sdsdfsdfs"}));
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    try {
        const fetchResponse = {data: []};
        // await validateSession();

        // await axios.get<ProductsData>(

        // сначала получаем данные в формате cartItem,
        // чтобы дальше по их id подтянуть полную
        // информацию о соответствующих товарах
        // из products
        await axios.get<cartData>(
            `http://127.0.0.1:8000/carts/${AuthService.getCurrentUser().id}`,
             {
                headers: authHeader()
                })
                .then(async response => {
                        // версия для эндпоинта products/{product_id}    
                        console.log(response);                    
                        const cartProductDetails = await Promise.all(response.data.products.map(async (cartItem: cartItem) => {
                                const response = await axios.get<IProductItem>(
                                        `http://127.0.0.1:8000/products/${cartItem.product_id}`,
                                        {
                                                headers: authHeader(),
                                                withCredentials: true
                                        }       
                                )       
                                return {...response.data, amount: cartItem.quantity};
                                // console.log(product.data);
                                // return product.data;
                        }));
                        console.log(cartProductDetails);
                        Object.defineProperty(fetchResponse,
                                "data",
                                {
                                // на всякий случай делаю deep copy
                                // с помощью JSON-api
                                // (возможно, это излишне)
                                value: JSON.parse(JSON.stringify(cartProductDetails)),
                                writable: false
                                });
                });

                        // временная версия

                //         const cartProductDetails = await axios.get<ProductsData>(
                //                 'http://127.0.0.1:8000/products/')
                //                 .then((response) => {
                //                         // console.log("entering the data-wrapping then-block");
                //                         console.log(response);
                        
                //                         // оборачиваем данные с сервера в объект,
                //                         // присваивая их в качестве значения ключа data
                //                         Object.defineProperty(fetchResponse,
                //                                 "data",
                //                                 {
                //                                 // на всякий случай делаю deep copy
                //                                 // с помощью JSON-api
                //                                 // (возможно, это излишне)
                //                                 value: JSON.parse(JSON.stringify(response.data)),
                //                                 writable: false
                //                                 });
                //                         });
                //                         return fetchResponse;
                //                         return Promise.resolve(fetchResponse);

                // })
                console.log(fetchResponse);
                return fetchResponse;
        } catch (error: any) {
                console.error("Error fetching data:", error);
                if(error.response.status === 401){
                AuthService.logout();
                //      setShowModeratorBoard(false);
                //      setShowAdminBoard(false);
                setCurrentUser(null);     
                }
                return Promise.resolve({data: []});
        }
};

// Версия для моков
// export const fetchCartProducts = async (): Promise<ProductsData> =>
//     await new Promise(resolve => {
//             resolve(cartProducts)
//     })