import axios from "axios";
import { ProductsData } from "./fetchProducts";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
// import { API_URL } from "../../utils/API_URL";

const API_URL = import.meta.env.VITE_API_URL;

// версия для бэкенда
export const checkout = async (
  userId: string,
  cartProducts: ProductsData
): Promise<boolean> => {
  const {
    profileStore: { setCurrentUser },
  } = rootStore;
  try {
    // await validateSession();
    // const orderDetails = JSON.stringify(cartProducts);
    console.log(userId);
    await axios.post(
      `${API_URL}/orders/`,
      {
        // user_id: userId,
        // требует integer
        user_id: userId,
        order_products: cartProducts,
      },
      {
        headers: authHeader(),
      }
    );
    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
      AuthService.logout();
      //  setShowModeratorBoard(false);
      //  setShowAdminBoard(false);
      setCurrentUser(null);
    }
    return false;
  }
};
