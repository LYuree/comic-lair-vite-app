import axios from "axios"
import { cartProducts } from "../../utils/cartProducts"

export const addToCart = async(userId: string, itemId: string, amount: number = 1): Promise<boolean> => {
    try{
        await axios.post(
            'https://backend.example/api/cart/add',
            {
                userId,
                itemId,
                amount
            }
        )
        return true;
    }
    catch(error){
        console.log(`Произошла ошибка при попытке добавления товара в корзину: ${error}
            userId: ${userId}, itemId: ${itemId}, amount: ${amount}`);
        return false;
    }
}