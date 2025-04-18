import axios from "axios";
import authHeader from "../../services/auth-header";
import validateSession from "../../services/validateSession";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";


export const setCartProductAmount = async (userId: string, itemId: number, newAmount: number): Promise<boolean> => {
//     // Версия для работы с бэком
        const {profileStore : {
            currentUser, setCurrentUser,
        }} = rootStore;
        try {
            // await validateSession();
            const cartId = userId;
            await axios.put(
                `http://127.0.0.1:8000/carts/${cartId}/update`,
                {
                    product_id: itemId,
                    quantity: newAmount
                },
                {
                    headers: authHeader()
                })
                .then((response) => response.data);
                return new Promise(resolve => resolve(true));

        } catch (error: any) {
            console.error(`Error updating cart product amount: ${error}`);
             if(error.response.status === 401){
                 AuthService.logout();
                //  setShowModeratorBoard(false);
                //  setShowAdminBoard(false);
                setCurrentUser(null);     
             }
            return new Promise(resolve => resolve(false));
        }
};

// версия для работы на моках... а нужна ли?..
// надо разбираться, как писать в JSON-файл - а мы в любом случае скоро будем запросы на бэк отправлять

// export const setCartProductAmount = async(userId: string = "", itemId: string, newAmount: number): Promise<boolean> => {
//     console.log(`Запрос на обновление кол-ва товара в корзине, userId: ${userId}, itemId: ${itemId}, newAmount: ${newAmount}`);
//     return new Promise(resolve => resolve(true));
// }