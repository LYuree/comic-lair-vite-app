import { CartStore } from "./cartStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { ProfileStore } from "./profileStore.ts";
import { ProductsStore } from "./productsStore.ts";

class store {
    productsStore: ProductsStore;
    cartStore: CartStore;
    gridPageStore: GridPageStore;
    profileStore: ProfileStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore();
        this.gridPageStore = new GridPageStore();
        this.profileStore = new ProfileStore();
    }
}

export const rootStore = new store();
