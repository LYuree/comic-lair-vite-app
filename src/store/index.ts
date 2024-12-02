import { CartStore } from "./cartStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { LoaderStore } from "./loaderStore.ts";
import { ProductsStore } from "./productsStore.ts";

class store {
    productsStore: ProductsStore;
    cartStore: CartStore;
    gridPageStore: GridPageStore;
    loaderStore: LoaderStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore();
        this.gridPageStore = new GridPageStore();
        this.loaderStore = new LoaderStore();
    }

    // setLoading = (isLoading) => {
    //     this.loaderStore.loading = 
    // }
}

export const rootStore = new store();
