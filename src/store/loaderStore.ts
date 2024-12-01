import { makeAutoObservable } from "mobx";

export class LoaderStore{
    loading: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    setLoading = (isLoading: boolean) => {
        this.loading = isLoading;
    }
}