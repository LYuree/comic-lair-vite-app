import { makeAutoObservable } from "mobx";


export class DisplayedProductsStore {
    numberOfDisplayedProducts: number = 0;

    constructor () {
        makeAutoObservable(this);
    }

    setNumberOfDisplayedProducts = (amount : number) => {
        this.numberOfDisplayedProducts = amount;
    }
}