import axios from "axios";
import authHeader from "../../services/auth-header";
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";



export const deleteCartProduct = async (userId: string, cartProductId: number) : Promise<string|undefined> => {
    // вариант с бэкендом
    const {profileStore : {
        setCurrentUser,
    }} = rootStore;
    try {
        // await validateSession();
        const headers = authHeader();
        const data = {
            userId,
            cartProductId,
        };
        await axios.delete<string>(
            `http://127.0.0.1:8000/carts/${userId}/delete/${cartProductId}`,
            {
                headers,
                data
            }
        )
        .then(response => JSON.stringify(response.data));
    }
    catch(error: any){
        console.log(`Error deleting a cart product: ${error}`)
        if(error.response.status === 401){
             AuthService.logout();
            //  setShowModeratorBoard(false);
            //  setShowAdminBoard(false);
             setCurrentUser(null);     
        }
        return Promise.reject(error);
    }
}