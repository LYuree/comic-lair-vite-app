import { ProductsData } from "./fetchProducts";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { API_URL } from "../../utils/API_URL";

export interface IOrdersData {
  data: IOrderDetails[];
}

export interface IOrderDetails {
  id: number;
  user_id: string;
  order_details: string;
}

export interface IOrderJSON {
  cartProducts: ProductsData;
  phone: "string";
  email: "string";
}

// Версия для работы с бэком

export const fetchOrderDetails = async (): Promise<IOrderJSON[]> => {
  const {
    profileStore: { currentUser, setCurrentUser },
  } = rootStore;
  try {
    let fetchResponse: IOrderJSON[] = [];
    // await validateSession();

    await axios
      .get<IOrderDetails[]>(`${API_URL}/orders/${currentUser?.id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        const orderItems = response.data;
        const orderDetails: IOrderJSON[] = orderItems.map(
          (orderItem: IOrderDetails) => JSON.parse(orderItem.order_details)
        );
        fetchResponse = orderDetails;
        return fetchResponse;
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
