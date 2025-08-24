import axios from "axios";
import authHeader from "../../services/auth-header";
// import { API_URL } from "../../utils/API_URL";

const API_URL = import.meta.env.VITE_API_URL;

type TProductCreate = {
  name: string;
  description: string;
  price: number;
  discount: number;
  hit: boolean;
  release_date: Date;
  brand: string;
  digital: boolean;
  categories: string[];
  cover_type: "Мягкая обложка" | "Твёрдая обложка" | "-";
  amount: number;
  cover_image: string;
  // images: ICoverImage,
  reviews: string[] | null;
};

export const adminCreateProduct = async (product: TProductCreate) => {
  try {
    const date = `${product.release_date.getFullYear()}-${
      product.release_date.getMonth() + 1
    }-${product.release_date.getUTCDate()}`;
    await axios.post(
      `${API_URL}/products`,
      {
        ...product,
        release_date: date.toString(),
      },
      {
        headers: authHeader(),
        withCredentials: true,
      }
    );
    return true;
  } catch (err) {
    console.log(
      `Произошла ошибка при попытке добавления товара в базу данных: ${err}`
    );
    return false;
  }
};
