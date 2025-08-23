import axios from "axios";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
// import { API_URL } from "../../utils/API_URL";

const API_URL = import.meta.env.VITE_API_URL;

export const setCartProductAmount = async (
  userId: string,
  itemId: number,
  newAmount: number
): Promise<boolean> => {
  //     // Версия для работы с бэком
  const {
    profileStore: { setCurrentUser },
  } = rootStore;
  try {
    // await validateSession();
    const cartId = userId;
    await axios
      .put(
        `${API_URL}/carts/${cartId}/update`,
        {
          product_id: itemId,
          quantity: newAmount,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => response.data);
    return new Promise((resolve) => resolve(true));
  } catch (error: any) {
    console.error(`Error updating cart product amount: ${error}`);
    if (error.response.status === 401) {
      AuthService.logout();
      //  setShowModeratorBoard(false);
      //  setShowAdminBoard(false);
      setCurrentUser(null);
    }
    return new Promise((resolve) => resolve(false));
  }
};
