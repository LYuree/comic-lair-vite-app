import { makeAutoObservable } from "mobx";

export class ProfileStore{
    profileLoading: boolean = false;
    currentUser: string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    setCurrentUser = (currentUser: string | null) => (this.currentUser = currentUser);

    setProfileLoading = (isLoading: boolean) => {
        this.profileLoading = isLoading;
    }
}