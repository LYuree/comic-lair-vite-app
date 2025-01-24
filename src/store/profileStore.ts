import { makeAutoObservable } from "mobx";
import { IOrderJSON, fetchOrderDetails } from "../api/products/fetchOrderDetails";

export class ProfileStore{
    profileLoading: boolean = false;
    currentUser: string | null = null;
    userOrderDetails: IOrderJSON[] = [];
    error: string | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    setUserOrderDetails = (userOrderDetails: IOrderJSON[]) => {
        this.userOrderDetails = userOrderDetails;
        console.log(!this.userOrderDetails);
    };

    setCurrentUser = (currentUser: string | null) => (this.currentUser = currentUser);

    setProfileLoading = (isLoading: boolean) => {
        this.profileLoading = isLoading;
    }

    setError = (error: string) => (this.error = error);

    fetchOrderDetails = async (): Promise<void> => {
        try {
            this.setProfileLoading(true);
            // вариант с рабочим бэком
            const userOrderDetails = await fetchOrderDetails();
            console.log(userOrderDetails);
            console.log(this);
            this.setUserOrderDetails(userOrderDetails);
            this.setProfileLoading(false);

        } catch (error) {
            console.log(error);
            this.setError("error");
            this.setProfileLoading(false);
        }
    }
}