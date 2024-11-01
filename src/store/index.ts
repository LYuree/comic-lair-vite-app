import { GridPageStore } from "./gridPageStore.ts";
import {ProductsStore} from "./productsStore.ts";

class store {
    productsStore: ProductsStore;
    gridPageStore: GridPageStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.gridPageStore = new GridPageStore();
    }
}

export const rootStore = new store();
