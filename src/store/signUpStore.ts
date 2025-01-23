import { makeAutoObservable } from "mobx";

export class SignUpStore{
    isSignupPopupOpen: boolean = false;
    
    constructor(){
        makeAutoObservable(this);
    }

    setSignupPopupOpen = (isOpen: boolean) => {this.isSignupPopupOpen = isOpen};
}