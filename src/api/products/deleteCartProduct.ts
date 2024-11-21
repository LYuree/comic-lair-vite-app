import axios from "axios";

// export const deleteCartProducts = async (userId: string, cartProductId: string) : Promise<string|undefined> => {
//     // вариант с бэкендом - VSCode требует указание <string | UNDEFINED>...
//     try {
//         await axios.delete<string>(
//             `https://backend.example/api/cart/delete`,
//             {
//                 data: {
//                     userId,
//                     cartProductId
//                 }
//             }
//         )
//         .then(response => JSON.stringify(response.data));
//     }
//     catch(error){
//         console.log(`Error deleting a cart product: ${error}`)
//         return Promise.resolve(`${error}`); //или reject? и нужен ли вообще этот промис...
//     }

    // вариант на моках
    export const deleteCartProduct = async (userId: string, cartProductId: string) : Promise<void> => {
        await new Promise(resolve => {
            resolve(`Запрос на удаление товара из корзины, userId: ${userId}, itemId: ${cartProductId}`);
        })
    }