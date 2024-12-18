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
    user_id: string,
    order_details: string
}

export interface IOrderJSON {
    cartProducts: ProductsData,
    phone: "string",
    email: "string"
}



// Версия для работы с бэком

// dev mode
localStorage.setItem("user", JSON.stringify({id: "64a654593e91b8e73a351e9sdfsdf", name: "Mykytko", token: "sdsdfsdfs"}));

export const fetchOrderDetails = async (): Promise<IOrderJSON[]> => {
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    try {
        let fetchResponse: IOrderJSON[] = [];
        // await validateSession();
              
        await axios.get<IOrderDetails[]>(
            `http://127.0.0.1:8000/orders/${AuthService.getCurrentUser().id}`,
            {
                headers: authHeader()
            })
            .then(response => {
                const orderItems = response.data;
                const orderDetails: IOrderJSON[] = orderItems.map(
                    (orderItem: IOrderDetails) => JSON.parse(orderItem.order_details));
                fetchResponse = orderDetails;
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