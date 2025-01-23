import { CartStore } from "./cartStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { ProfileStore } from "./profileStore.ts";
import { ProductsStore } from "./productsStore.ts";
import { SignUpStore } from "./signUpStore.ts";

class store {
    productsStore: ProductsStore;
    cartStore: CartStore;
    gridPageStore: GridPageStore;
    profileStore: ProfileStore;
    signUpStore: SignUpStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore();
        this.gridPageStore = new GridPageStore();
        this.profileStore = new ProfileStore();
        this.signUpStore = new SignUpStore();
    }
}

export const rootStore = new store();
