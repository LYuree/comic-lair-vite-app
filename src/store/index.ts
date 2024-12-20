import { CartStore } from "./cartStore";
import { GridPageStore } from "./gridPageStore";
import { ProfileStore } from "./profileStore";
import { ProductsStore } from "./productsStore";

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
