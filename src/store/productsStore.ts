import { makeAutoObservable } from "mobx";
import {fetchProducts, IProductItem, ProductsData} from "../api/products/fetchProducts.ts";

enum SortingMethod {
    "popular_first",
    "cheapest_first",
    "expensive_first",
    "A_Z",
    "Z_A",
    "newest_first",
    "oldest_first"
}

export class ProductsStore {
    products: ProductsData = {
        data: []
    };
    displayedProducts : ProductsData = {
        data: []
    };
    productsLoading: boolean = false; // Loader при загрузке комиксов
    sortingMethod: string = "newest_first"; // для сортировки
                        // по популярности - у нас пока не предусмотрено
                        // поле отзывов в типе ProductsData...
    error: null | string = null;

    constructor() {
        makeAutoObservable(this);
    }

    /*Сеттеры*/
    setProducts = (products: ProductsData) => (this.products = products);
    setDisplayedProducts = (displayedProducts: ProductsData) => (this.displayedProducts = displayedProducts);
    setError = (error: string) => (this.error = error);
    setFieldsLoading = (loading: boolean) => (this.productsLoading = loading);
    setSortingMethod = (sortingMethod: string) => {
        if (!(<any>Object).values(SortingMethod).includes(sortingMethod)){
            this.setError("Ошибка в методе сортировки");
            return 0;
        }
        // фокусы с JSON здесь заменяют функцию structuredClone,
        // которая почему-то не работает
        const sortedProducts = JSON.parse(JSON.stringify((this.displayedProducts)));
        switch (sortingMethod){
            case "popular_first" :
                console.log("Сортировка по популярности ещё не внедрена...");
                break;
            case "cheapest_first" :
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['price'] - b['price']);
                break;
            case "expensive_first" :
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => b['price'] - a['price']);
                break;
            case "A_Z":
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['name'].localeCompare(b['name']));
                break;
            case "Z_A":
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['name'].localeCompare(b['name'])).reverse();
                break;
            // сортировку по дате пока не сделал,
            // нужно определиться с форматом строки даты
            // (я думаю, не имеет смысла учитывать
            // часы и тайм-зоны при рассмотрении
            // даты выхода комикса)

            // case "oldest_first":
                // sortedProducts.data.sort((a: IProductItem, b: IProductItem) => new Date(a['releaseDate']) -  new Date(b['releaseDate'])).reverse();
                // break;
            default:
                this.setError("Ошибка в типе сортировки (выполнен вход в ветку switch).")
                break;
        }
        this.setDisplayedProducts(sortedProducts);
    }

    sortProducts = () => {
        const sortedProducts = JSON.parse(JSON.stringify((this.displayedProducts)));
        switch (this.sortingMethod){
            case "popular_first" :
                console.log("Сортировка по популярности ещё не внедрена...");
                break;
            case "cheapest_first" :
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['price'] - b['price']);
                break;
            case "expensive_first" :
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => b['price'] - a['price']);
                break;
            case "A_Z":
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['name'].localeCompare(b['name']));
                break;
            case "Z_A":
                sortedProducts.data.sort((a: IProductItem, b: IProductItem) => a['name'].localeCompare(b['name'])).reverse();
                break;
            // сортировку по дате пока не сделал,
            // нужно определиться с форматом строки даты
            // (я думаю, не имеет смысла учитывать
            // часы и тайм-зоны при рассмотрении
            // даты выхода комикса)

            // case "oldest_first":
                // sortedProducts.data.sort((a: IProductItem, b: IProductItem) => new Date(a['releaseDate']) -  new Date(b['releaseDate'])).reverse();
                // break;
            default:
                this.setError("Ошибка в типе сортировки (выполнен вход в ветку switch).")
                break;
        }
        this.setDisplayedProducts(sortedProducts);
    }

    // Получение и запись комиксов
    fetchProducts = async (): Promise<void> => {
        try {
            this.setFieldsLoading(true);
            // вариант с рабочим бэком
            // const productsData = await fetchProducts();
            // this.setProducts(productsData);
            // this.setDisplayedProducts(productsData);
            // this.setFieldsLoading(false);

            // вариант на моках
            setTimeout(async ()=> {
                const productsData = await fetchProducts();
                this.setProducts(productsData);
                this.setDisplayedProducts(JSON.parse(JSON.stringify(productsData)));
                this.setFieldsLoading(false);
            }, 2000)

        } catch (error) {
            this.setError("error");
            this.setFieldsLoading(false);
        }
    };
}
