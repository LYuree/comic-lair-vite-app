import { IProductItem, ProductsData, fetchProducts } from "./fetchProducts"
import { cartProducts } from "../../utils/cartProducts"
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import validateSession from "../../services/validateSession";
import axios from "axios";
import authHeader from "../../services/auth-header";

// interface IOrderItem {
//     id: string,
//     date: string,
//     status: string,
// }

export interface IOrdersData {
    data: IOrderDetails[]
}

export interface IOrderDetails{
    id: number,
    user_id: number,
    order_details: string
}

export interface IOrderJSON {
    cartProducts: ProductsData,
    phone: "string",
    email: "string"
}



// Версия для работы с бэком

// dev mode
localStorage.setItem("user", JSON.stringify({id: "1", name: "Archimboldo", token: "sdsdfsdfs"}));

export const fetchOrderDetails = async (): Promise<IOrderJSON[]> => {
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    // let orderItemStrings = [];
    try {
        let fetchResponse: IOrderJSON[] = [];
        // await validateSession();

        // await axios.get<ProductsData>(
        // получаем данные в формате массива JSON-строк
        
        await axios.get<IOrderDetails[]>(
            `http://127.0.0.1:8000/orders/${AuthService.getCurrentUser().id}`,
            {
                headers: authHeader()
            })
            .then(response => {
                const orderItems = response.data;
                const orderDetails: IOrderJSON[] = orderItems.map(
                    (orderItem: IOrderDetails) => JSON.parse(orderItem.order_details));
                // Object.defineProperty(fetchResponse,
                //     "data",
                //     {
                //     // на всякий случай делаю deep copy
                //     // с помощью JSON-api
                //     // (возможно, это излишне)
                //     value: JSON.parse(JSON.stringify(orderDetails)),
                //     writable: false
                //     });
                //     console.log(fetchResponse);
                //     return fetchResponse;
                // });
                fetchResponse = orderDetails;
            // console.log(orderItemStrings);
            // const orderItems = orderItemStrings.map(
                // (orderItemString: IOrderDetails) => JSON.parse(orderItemString.order_details))
            // console.log(orderItems);
            return fetchResponse;
        })
        return fetchResponse;
    }
        catch (error: any) {
                console.error("Error fetching data:", error);
                if(error.response.status
                    && error.response.status === 401){
                AuthService.logout();
                //      setShowModeratorBoard(false);
                //      setShowAdminBoard(false);
                setCurrentUser(null);     
                }
                return [];
        }
};

// Версия для моков
// export const fetchCartProducts = async (): Promise<ProductsData> =>
//     await new Promise(resolve => {
//             resolve(cartProducts)
//     })