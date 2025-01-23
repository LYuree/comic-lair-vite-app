import { makeAutoObservable } from "mobx";
import { IProductItem } from "../api/products/fetchProducts";

export class ProductDetailsStore{
    productDetails: IProductItem | null | undefined = null;
    setProductDetails = (details: IProductItem | null | undefined) => {if(details) this.productDetails = details};

    constructor(){
        makeAutoObservable(this);
    }
}