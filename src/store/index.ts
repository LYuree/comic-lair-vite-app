import {ProductsStore} from "./productsStore.ts";

class store {
    productsStore: ProductsStore;

    constructor() {
        this.productsStore = new ProductsStore();
    }
}

export const rootStore = new store();
