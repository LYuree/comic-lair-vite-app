import axios from "axios";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import { API_URL } from "../../utils/API_URL";

// вариант с рабочим бэкендом
export const addToCart = async (
  userId: string,
  itemId: number,
  amount: number = 1
): Promise<boolean> => {
  const {
    profileStore: { setCurrentUser },
  } = rootStore;
  try {
    // await validateSession();
    await axios.post(
      `${API_URL}/carts/${userId}/add`,
      {
        quantity: amount,
        product_id: itemId,
      },
      {
        headers: authHeader(),
        withCredentials: true,
      }
    );
    return true;
  } catch (error: any) {
    console.log(`Произошла ошибка при попытке добавления товара в корзину: ${error}
            userId: ${userId}, itemId: ${itemId}, amount: ${amount}`);
    if (error.response.status === 401) {
      AuthService.logout();
      //  setShowModeratorBoard(false);
      //  setShowAdminBoard(false);
      setCurrentUser(null);
    }
    return false;
  }
};
