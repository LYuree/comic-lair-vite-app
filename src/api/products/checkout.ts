import axios from "axios";
import { ProductsData } from "./fetchProducts"
import authHeader from "../../services/auth-header";
import validateSession from "../../services/validateSession";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";


// версия для бэкенда
export const checkout = async (userId: string,
    phone: string,
    email: string,
    cartProducts: ProductsData): Promise<boolean> => {
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    // console.log(`User id: ${typeof AuthService.getCurrentUser().id}`);
    const userIdInt = parseInt(userId);
    console.log(userId, userIdInt);
    try {
        // await validateSession();
        const orderDetails = JSON.stringify({
            phone,
            email,
            cartProducts
        }); 
        console.log(userIdInt);
        await axios.post(
            'http://127.0.0.1:8000/orders/',
            {
                // user_id: userId,
                // требует integer
                user_id: userIdInt,
                order_details: orderDetails
            },
            {
             headers: authHeader(),
            }
        )
        return true;
    }
    catch (error: any) {
        console.log(error);
        if(error.response.status === 401){
             AuthService.logout();
            //  setShowModeratorBoard(false);
            //  setShowAdminBoard(false);
            setCurrentUser(null);     
        }
        return false;
    }
}

// вариант на моках
// export const checkout = async (userId: string, cartProducts: ProductsData) : Promise<boolean> => {
//     console.log(`Запрос на оформление заказа, userId: ${userId}, cartProducts:`, cartProducts.data);
//     return new Promise(resolve => resolve(true));
// }