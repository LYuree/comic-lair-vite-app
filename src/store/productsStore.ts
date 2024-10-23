import { makeAutoObservable } from "mobx";
import {fetchProducts, ProductsData} from "../api/products/fetchProducts.ts";

export class ProductsStore {
    products: ProductsData = {
        products: []
    };
    productsLoading: boolean = false; // Loader при загрузке комиксов
    error: null | string = null;

    constructor() {
        makeAutoObservable(this);
    }

    /*Сеттеры*/
    setProducts = (products: ProductsData) => (this.products = products);
    setError = (error: string) => (this.error = error);
    setFieldsLoading = (loading: boolean) => (this.productsLoading = loading);

    // Получение и запись комиксов
    fetchProducts = async (): Promise<void> => {
        this.setFieldsLoading(true);
        try {
            const productsData = await fetchProducts();
            this.setProducts(productsData);
        } catch (error) {
            this.setError("error");
        } finally {
            this.setFieldsLoading(false);
        }
    };
}
