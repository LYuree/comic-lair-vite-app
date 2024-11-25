import { DisplayedProductsStore } from "./displayedProductsStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { ProductsStore } from "./productsStore.ts";

class store {
    productsStore: ProductsStore;
    gridPageStore: GridPageStore;
    displayedProductsStore: DisplayedProductsStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.gridPageStore = new GridPageStore();
        this.displayedProductsStore = new DisplayedProductsStore();
    }
}

export const rootStore = new store();
