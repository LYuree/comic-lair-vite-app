import { IProductItem, ProductsData } from "./fetchProducts"
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
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
    const {profileStore : {
        setCurrentUser,
        }} = rootStore;
    try {
        const fetchResponse = {data: []};
        // await validateSession();

        // await axios.get<ProductsData>...

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
                        }));
                        console.log(cartProductDetails);
                        Object.defineProperty(fetchResponse,
                                "data",
                                {
                                value: JSON.parse(JSON.stringify(cartProductDetails)),
                                writable: false
                                });
                });
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