import { makeAutoObservable } from "mobx";


export type ItemsPerPageRange = 12|24|36;

export class GridPageStore {

    currentPage: number = 1;
    itemsPerPage: number = 12;
    gridLoading: boolean = false;
    gridError: null | string = null;

    constructor () {
        makeAutoObservable(this);
    }

    // сеттеры
    setCurrentPage = (page: number) => {
        this.currentPage = page;
    }
    setItemsPerPage = (count: number) => {
        this.itemsPerPage = count;
    }
    setError = (error: string) => (this.gridError = error);
}