import { makeAutoObservable } from "mobx";


export type ItemsPerPageRange = 12|24|36;

interface categoryCheckbox {
    id: string,
    categoryName: string,
    checked: boolean
}

export class GridPageStore {

    currentPage: number = 1;
    itemsPerPage: number = 12;
    gridLoading: boolean = false;
    gridError: null | string = null;
    categoryCheckboxes: categoryCheckbox[] = [];

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
    setError = (error: string) => {this.gridError = error};
    
    setCategoryCheckboxes = (categoryCheckboxes: categoryCheckbox[]) => {
        this.categoryCheckboxes = categoryCheckboxes;
    };

    toggleCategoryCheckbox = (id: string, checkedValue: boolean) => {
        this.setCategoryCheckboxes(this.categoryCheckboxes.map(checkbox => {
            return (checkbox.id === id ? {...checkbox, checked: checkedValue} : checkbox)
        }));
    }
}