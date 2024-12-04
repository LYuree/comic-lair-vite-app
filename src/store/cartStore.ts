import { makeAutoObservable } from "mobx";
import { ProductsData } from "../api/products/fetchProducts.ts";
import { IProductItem } from "../api/products/fetchProducts";
import { fetchCartProducts } from "../api/products/fetchCartProducts.ts";
import { deleteCartProduct } from "../api/products/deleteCartProduct.ts";
import { checkout } from "../api/products/checkout.ts";

export class CartStore {
    cartProducts: ProductsData = {
        data: []
    };
    cartLoading: boolean = false;
    error: string | null = null;
    
    get totalCost(): number {
        return this.cartProducts.data.reduce((accumulator, currentProduct: IProductItem) =>
            accumulator + currentProduct.price*(1 - currentProduct.discount)*currentProduct.amount, 0);
    }

    constructor(){
        makeAutoObservable(this);
    }
    setCartLoading = (loading: boolean) => (this.cartLoading = loading);
    setCartProducts = (products: ProductsData) => (this.cartProducts = products);
    setCartProductAmount = (id: string, amount: number) => {
        const newCartProducts = {
            data: this.cartProducts.data.map(item => (item.id === id? {...item, amount}: item))
        };
        this.setCartProducts(newCartProducts);
    }
    deleteCartProduct = async (userId: string, id: string) => {
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
        setTimeout(async ()=> {
            // let newCartProducts = JSON.parse(JSON.stringify(this.cartProducts));
            const newCartProducts = {
                data: this.cartProducts.data.filter((item: IProductItem) => item.id !== id ? true : false)
            }
            console.log(this.cartProducts === newCartProducts);
            this.setCartProducts(newCartProducts);
            await deleteCartProduct(userId, id); //
            this.setCartLoading(false);
        }, 500);
    }
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
            this.setCartProducts({data: []});
            this.setCartLoading(false);
        }, 500);
    }
    setError = (error: string) => (this.error = error);


    fetchCartProducts = async (): Promise<void> => {
        try {
            this.setCartLoading(true);
            // вариант с рабочим бэком
            // const cartProductsData = await fetchCartProducts();
            // this.setCartProducts(cartProductsData);
            // this.setFieldsLoading(false);

            // вариант на моках
            setTimeout(async ()=> {
                const productsData = await fetchCartProducts();
                this.setCartProducts(productsData);
                this.setCartLoading(false);
            }, 2000)

        } catch (error) {
            console.log(error);
            this.setError("error");
            this.setCartLoading(false);
        }
    }    
}