import axios from "axios";
import { API_URL } from "../../utils/API_URL";

export interface ICoverImage {
  image: string;
}

// Определение интерфейса для данных
export interface IProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  hit: boolean | null;
  releaseDate: string | null;
  brand: string;
  digital: boolean;
  categories: string[];
  cover_type: string;
  cover_image: string;
  amount: number;
  // images: ICoverImage[],
  reviews: string[] | null;
}

export interface ProductsData {
  data: IProductItem[];
}

// Версия для работы с бэком
export const fetchProducts = async (): Promise<ProductsData> => {
  try {
    const fetchResponse = { data: [] };
    await axios.get<ProductsData>(`${API_URL}/products/`).then((response) => {
      // оборачиваем данные с сервера в объект,
      // присваивая их в качестве значения ключа data
      Object.defineProperty(fetchResponse, "data", {
        // на всякий случай делаю deep copy
        // с помощью JSON-api
        // (возможно, это излишне)
        value: JSON.parse(JSON.stringify(response.data)),
        writable: false,
      });
      return fetchResponse;
    });
    return fetchResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Верните пустой массив ProductsData в виде обещания
    return Promise.resolve({ data: [] });
  }
};
