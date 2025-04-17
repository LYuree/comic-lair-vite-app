import { makeAutoObservable } from "mobx";
import { IOrderJSON, IOrdersData, fetchOrderDetails } from "../api/products/fetchOrderDetails";

export class ProfileStore{
    profileLoading: boolean = false;
    currentUser: string | null = null;
    // userOrderDetails: IOrdersData = {
    //     data: []
    // };
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
            // const cartProductsDataArray = JSON.parse(JSON.stringify(cartProductsData));
            console.log(this);
            this.setUserOrderDetails(userOrderDetails);
            this.setProfileLoading(false);

            // вариант на моках
            // setTimeout(async ()=> {
            //     const productsData = await fetchCartProducts();
            //     this.setCartProducts(productsData);
            //     this.setCartLoading(false);
            // }, 2000)

        } catch (error) {
            console.log(error);
            this.setError("error");
            this.setProfileLoading(false);
        }
    }
}