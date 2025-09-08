import { makeAutoObservable } from "mobx";
import { ProductsData } from "../api/products/fetchProducts.ts";
import { IProductItem } from "../api/products/fetchProducts";
import { cartItem } from "../api/products/fetchCartProducts.ts";
import { checkout } from "../api/products/checkout.ts";
import authHeader from "../services/auth-header.ts";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export class CartStore {
  cartProducts: ProductsData = {
    data: [],
  };
  cartLoading: boolean = false;
  error: string | null = null;
  email: string = "";
  phone: string = "";
  isCheckoutPopupOpen: boolean = false;

  get totalCost(): number {
    console.log(this.cartProducts.data);
    return this.cartProducts.data.reduce(
      (accumulator, currentProduct: IProductItem) =>
        accumulator +
        currentProduct.price *
          (1 - currentProduct.discount) *
          currentProduct.amount,
      0
    );
  }

  constructor() {
    makeAutoObservable(this);
  }
  setCheckoutPopupOpen = (isOpen: boolean) => {
    this.isCheckoutPopupOpen = isOpen;
  };
  setEmail = (email: string) => (this.email = email);
  setPhone = (phone: any) => {
    console.log("Phone number: ", typeof phone);
    this.phone = phone;
  };
  setCartLoading = (loading: boolean) => (this.cartLoading = loading);
  setCartProducts = (products: ProductsData) => {
    this.cartProducts = products;
  };
  setCartProductAmount = async (
    userId: string,
    itemId: number,
    newAmount: number
  ) => {
    console.log(userId);
    this.setCartLoading(true);
    const cartStr = localStorage.getItem("cart");
    const cart = cartStr ? JSON.parse(cartStr) : null;
    if (cart) {
      const newCart = cart.map((item: cartItem) => {
        return item.product_id === itemId
          ? { ...item, quantity: newAmount }
          : item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      console.log(localStorage.getItem("cart"));
    }
    const newCartProducts = {
      data: this.cartProducts.data.map((item) =>
        item.id === itemId ? { ...item, amount: newAmount } : item
      ),
    };
    this.setCartProducts(newCartProducts);
    this.setCartLoading(false);
  };

  deleteCartProduct = async (userId: string, id: number) => {
    console.log(userId);
    // проверка на успешное удаление...
    this.setCartLoading(true);
    // вариант с рабочим бэком
    // const newCartProducts = {
    //     data: this.cartProducts.data.filter(item => item.id !== id? true : false)
    // }
    // this.setCartProducts(newCartProducts);
    // await deleteCartProduct(userId, id); //
    // this.setCartLoading(false);

    // вариант на моках
    setTimeout(async () => {
      const newCartProducts = {
        data: this.cartProducts.data.filter((item: IProductItem) =>
          item.id !== id ? true : false
        ),
      };
      console.log(this.cartProducts === newCartProducts);
      const cartStr = localStorage.getItem("cart");
      const cart = cartStr ? JSON.parse(cartStr) : null;
      if (cart) {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            cart.filter((item: cartItem) => item.product_id !== id)
          )
        );
        console.log(localStorage.getItem("cart"));
      }
      this.setCartProducts(newCartProducts);
      this.setCartLoading(false);
    }, 500);
  };
  checkout = (userId: string, cartProducts: ProductsData) => {
    // проверка на успешное удаление...
    this.setCartLoading(true);
    // вариант с рабочим бэком
    // await checkout(userId, cartProducts);
    // this.setCartProducts({data: []});
    // this.setCartLoading(false);

    // вариант на моках
    setTimeout(async () => {
      await checkout(userId, cartProducts);
      this.setCartProducts({ data: [] });
      this.setCartLoading(false);
      this.setCheckoutPopupOpen(true);
    }, 500);
  };
  setError = (error: string) => (this.error = error);

  fetchCartProducts = async (): Promise<void> => {
    try {
      this.setCartLoading(true);
      // вариант с рабочим бэком
      // const cartProductsData = await fetchCartProducts();

      // вариант с бэком + localStorage
      const cartStr = localStorage.getItem("cart");
      const cart = cartStr ? JSON.parse(cartStr) : null;
      if (!cartStr) return;
      const result = { data: [] };
      console.log(cart);
      const cartProductsData = await Promise.all(
        cart.map(async (cartItem: cartItem) => {
          const response = await axios.get<IProductItem>(
            `${API_URL}/products/${cartItem.product_id}`,
            {
              headers: authHeader(),
              withCredentials: true,
            }
          );
          return { ...response.data, amount: cartItem.quantity };
        })
      );
      Object.defineProperty(result, "data", {
        // на всякий случай делаю deep copy
        // с помощью JSON-api
        // (возможно, это излишне)
        value: JSON.parse(JSON.stringify(cartProductsData)),
        writable: false,
      });
      this.setCartProducts(result);
      this.setCartLoading(false);
    } catch (error) {
      console.log(error);
      this.setError("error");
      this.setCartLoading(false);
    }
  };
}
