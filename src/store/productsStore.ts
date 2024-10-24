import { makeAutoObservable } from "mobx";
import {fetchProducts, ProductsData} from "../api/products/fetchProducts.ts";

export class ProductsStore {
    products: ProductsData = {
        data: []
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
        try {
            this.setFieldsLoading(true);
            // вариант с рабочим бэком
            // const productsData = await fetchProducts();
            // this.setProducts(productsData);
            // this.setFieldsLoading(false);

            // вариант на моках
            setTimeout(async ()=> {
                const productsData = await fetchProducts();
                this.setProducts(productsData);
                this.setFieldsLoading(false);
            }, 2000)

        } catch (error) {
            this.setError("error");
            this.setFieldsLoading(false);
        }
    };
}
