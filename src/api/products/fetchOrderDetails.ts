// import { ProductsData } from "./fetchProducts";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import axios from "axios";
import authHeader from "../../services/auth-header";
// import { API_URL } from "../../utils/API_URL";
import { ProductsData } from "./fetchProducts";

const API_URL = import.meta.env.VITE_API_URL;

// export interface IOrdersData {
//   data: IOrderDetails[];
// }

// export interface IOrderDetails {
//   id: number;
//   user_id: string;
//   order_details: string;
// }

// export interface IOrderJSON {
//   cartProducts: ProductsData;
//   phone: "string";
//   email: "string";
// }

export interface IOrderJSON {
  order_products: ProductsData;
  id: number;
  user_id: string;
}

// export interface IOrderDetails {
//   id: number;
//   phone: string;
//   email: string;
//   cartProducts: ProductsData;
// }

// Версия для работы с бэком

export const fetchOrderDetails = async (): Promise<IOrderJSON[]> => {
  const {
    profileStore: { currentUser, setCurrentUser },
  } = rootStore;
  try {
    let fetchResponse: IOrderJSON[] = [];
    // await validateSession();

    await axios
      .get<IOrderJSON[]>(`${API_URL}/orders/${currentUser?.id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        const orders = response.data;
        // const orderDetails: IOrderJSON[] = orderItems.map(
        //   (orderItem: IOrderDetails) => {
        //     return {
        //       order_details: JSON.parse(orderItem.order_details),
        //       id: orderItem.id,
        //       user_id: orderItem.user_id,
        //     };
        //   }
        // );
        fetchResponse = orders;
        // return fetchResponse;
        return orders;
      });
    return fetchResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    if (error.response.status && error.response.status === 401) {
      AuthService.logout();
      //      setShowModeratorBoard(false);
      //      setShowAdminBoard(false);
      setCurrentUser(null);
    }
    return [];
  }
};
