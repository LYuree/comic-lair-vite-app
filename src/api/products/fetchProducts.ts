import axios from "axios";

// const mockedProducts: ProductsData = {
//     products: [
//         {
//             id: 1,
//             title: '1'
//         },
//         {
//             id: 2,
//             title: '2'
//         }
//     ]
// }

// Определение интерфейса для данных
interface IProductItem {
    id: number;
    title: string;
}
export interface ProductsData {
    products: IProductItem[];
}


export const fetchProducts = async (): Promise<ProductsData> => {
    try {
        await axios.get<ProductsData>(
            'https://backend.example/api/products',
        ).then((response) => response.data);



        // На моках пока что так
        // return mockedProducts
    } catch (error) {
        console.error("Error fetching data:", error);
        // Верните пустой массив ProductsData в виде обещания
        return Promise.resolve({
            products: []
        });
    }
};

