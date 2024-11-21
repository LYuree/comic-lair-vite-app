import axios from "axios";
import { ProductsData } from "./fetchProducts"

export const checkout = async (userId: string, cartProducts: ProductsData): Promise<boolean> => {
    try {
        await axios.post(
            'https://backend.example/api/cart/checkout',
            {
                userId,
                cartProducts
            }
        )
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}