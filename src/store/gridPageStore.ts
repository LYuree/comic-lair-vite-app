import { makeAutoObservable } from "mobx";


export type ItemsPerPageRange = 12|24|36;

export interface categoryCheckbox {
    id: string,
    categoryName: string,
    checked: boolean
}

export class GridPageStore {

    currentPage: number = 1;
    itemsPerPage: number = 12;
    gridLoading: boolean = false;
    gridError: null | string = null;
    searchFormValue: string = "";
    categoryCheckboxes: categoryCheckbox[] = [];

    // NEW

    coverCheckboxes: { id: string; coverType: string; checked: boolean }[] = [];
    brandCheckboxes: { id: string; brandName: string; checked: boolean }[] = [];
    minPrice: number = 0;
    maxPrice: number = 1000;

    constructor () {
        makeAutoObservable(this);
    }

    // get maxAvailablePrice() {
    //     const pricesAvailable = products.data.map(item => item.price);
    //     const maxAvailablePrice = Math.max(...pricesAvailable);
    // }

    // сеттеры

    // переделать maxAvailablePrice в computed value так,
    // чтобы прямо в gridPageStore импортировались products из
    // productsStore - и из массива бралась макс. цена?
    setMaxPrice = (maxPrice: number) => {
        this.maxPrice = maxPrice;
    }

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


    setSearchFormValue = (textInput: string) => {this.searchFormValue = textInput};

    // NEW

    toggleCategoryCheckbox = (id: string, checkedValue: boolean) => {
        this.setCategoryCheckboxes(this.categoryCheckboxes.map(checkbox => (checkbox.id === id ? {...checkbox, checked: checkedValue} : checkbox) ));
    }

    setCoverCheckboxes = (checkboxes: { id: string; coverType: string; checked: boolean }[]) => {
        this.coverCheckboxes = checkboxes;
    }

    toggleCoverCheckbox = (id: string, checked: boolean) => {
        const index = this.coverCheckboxes.findIndex(checkbox => checkbox.id === id);
        if (index !== -1) {
            this.coverCheckboxes[index].checked = checked;
        }
    }

    setBrandCheckboxes = (checkboxes: { id: string; brandName: string; checked: boolean }[]) => {
        this.brandCheckboxes = checkboxes;
    }

    toggleBrandCheckbox = (id: string, checked: boolean) => {
        const index = this.brandCheckboxes.findIndex(checkbox => checkbox.id === id);
        if (index !== -1) {
            this.brandCheckboxes[index].checked = checked;
        }
    }

    setPriceRange = (min: number, max: number) => {
        this.minPrice = min;
        this.maxPrice = max;
    }
}