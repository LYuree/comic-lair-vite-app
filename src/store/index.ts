import { CartStore } from "./cartStore.ts";
import { GridPageStore } from "./gridPageStore.ts";
import { ProfileStore } from "./profileStore.ts";
import { ProductsStore } from "./productsStore.ts";
import { SignUpStore } from "./signUpStore.ts";
import { ProductDetailsStore } from "./productDetailsStore.ts";

class store {
    productsStore: ProductsStore;
    cartStore: CartStore;
    gridPageStore: GridPageStore;
    profileStore: ProfileStore;
    signUpStore: SignUpStore;
    productDetailsStore: ProductDetailsStore;

    constructor() {
        this.productsStore = new ProductsStore();
        this.cartStore = new CartStore();
        this.gridPageStore = new GridPageStore();
        this.profileStore = new ProfileStore();
        this.signUpStore = new SignUpStore();
        this.productDetailsStore = new ProductDetailsStore();
    }
}

export const rootStore = new store();
