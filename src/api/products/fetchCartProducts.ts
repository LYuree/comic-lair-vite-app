import { ProductsData } from "./fetchProducts"
import { cartProducts } from "../../utils/cartProducts"
import * as AuthService from "../../services/auth.service";
import { rootStore } from "../../store";
import validateSession from "../../services/validateSession";
import axios from "axios";
import authHeader from "../../services/auth-header";

// Версия для работы с бэком

// dev mode
localStorage.setItem("user", JSON.stringify({id: "1", name: "Archimboldo", token: "sdsdfsdfs"}));

export const fetchCartProducts = async (): Promise<ProductsData> => {
    const {profileStore : {
        currentUser, setCurrentUser,
        }} = rootStore;
    try {
        const fetchResponse = {data: []};
        // await validateSession();
        await axios.get<ProductsData>(
            `http://127.0.0.1:8000/carts/${AuthService.getCurrentUser().id}`,
             {
                headers: authHeader()
             })
            .then((response) => {
                // оборачиваем данные с сервера в объект,
                // присваивая их в качестве значения ключа data
                Object.defineProperty(fetchResponse,
                    "data",
                    {
                        // на всякий случай делаю deep copy
                        // с помощью JSON-api
                        // (возможно, это излишне)
                        value: JSON.parse(JSON.stringify(response.data)),
                        writable: false
                    });
                return fetchResponse;
            });
            return Promise.resolve(fetchResponse);

    } catch (error: any) {
        console.error("Error fetching data:", error);
        if(error.response.status === 401){
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