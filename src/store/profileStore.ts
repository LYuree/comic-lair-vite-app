import { makeAutoObservable } from "mobx";

export class ProfileStore{
    profileLoading: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    setProfileLoading = (isLoading: boolean) => {
        this.profileLoading = isLoading;
    }
}