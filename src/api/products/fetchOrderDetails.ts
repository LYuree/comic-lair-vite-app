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

interface IOrderDetails{
    id: number,
    user_id: number,
    order_details: string
}

interface cartUnit {
        id: number;
        user_id: number;
        product_id: number;
}

// Версия для работы с бэком

// dev mode
localStorage.setItem("user", JSON.stringify({id: "1", name: "Archimboldo", token: "sdsdfsdfs"}));

export const fetchOrderDetails = async (): Promise<ProductsData> => {
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    // let orderItemStrings = [];
    try {
        const fetchResponse = {data: []};
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
                const orderDetails = orderItems.map(
                    (orderItem: IOrderDetails) => JSON.parse(orderItem.order_details))
                console.log(orderDetails);
                return orderDetails;
            });
            // console.log(orderItemStrings);
            // const orderItems = orderItemStrings.map(
                // (orderItemString: IOrderDetails) => JSON.parse(orderItemString.order_details))
            // console.log(orderItems);
            return fetchResponse;
        } catch (error: any) {
                console.error("Error fetching data:", error);
                if(error.response.status
                    && error.response.status === 401){
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