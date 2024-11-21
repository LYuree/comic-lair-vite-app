import { CartStore } from "./cartStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { ProductsStore } from "./productsStore.ts";

class store {
    productsStore: ProductsStore;
    cartStore: CartStore;
    gridPageStore: GridPageStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore();
        this.gridPageStore = new GridPageStore();
    }
}

export const rootStore = new store();
