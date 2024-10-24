import axios from "axios";
import {products} from "../../utils/products.tsx";

interface ICoverImage {
    image: string
}

// Определение интерфейса для данных
export interface IProductItem {
    id: string,
    name: string,
    description: string,
    price: number,
    discount: number | null,
    hit: boolean | null,
    releaseDate: string | null,
    brand: string,
    digital: boolean,
    categories: string[],
    cover: string,
    inStock: boolean,
    images: ICoverImage[],
    reviews: string[] | null,
}

export interface ProductsData {
    data: IProductItem[];
}

// Версия для работы с бэком
// export const fetchProducts = async (): Promise<ProductsData> => {
//     try {
//         await axios.get<ProductsData>(
//             'https://backend.example/api/products')
//             .then((response) => response.data);
//
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         // Верните пустой массив ProductsData в виде обещания
//         return Promise.resolve({
//             data: []
//         });
//     }
// };
// Версия для моков
export const fetchProducts = async (): Promise<ProductsData> =>
    await new Promise(resolve => {
            resolve(products)
    })
