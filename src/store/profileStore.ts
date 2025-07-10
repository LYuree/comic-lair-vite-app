import { makeAutoObservable } from "mobx";
import {
  IOrderJSON,
  fetchOrderDetails,
} from "../api/products/fetchOrderDetails";
import IUser from "../types/user.type";

export class ProfileStore {
  profileLoading: boolean = false;
  currentUser: IUser | null = null;
  currentUserToken: string | null = null;
  currentUserRefreshToken: string | null = null;
  currentUserRole: string | null = null;
  userOrderDetails: IOrderJSON[] = [];
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  authChecked: boolean = false;

  setAuthChecked = (value: boolean) => {
    this.authChecked = value;
  };

  setUserOrderDetails = (userOrderDetails: IOrderJSON[]) => {
    this.userOrderDetails = userOrderDetails;
    console.log(!this.userOrderDetails);
  };

  setCurrentUser = (currentUser: IUser | null) =>
    (this.currentUser = currentUser);

  setCurrentUserToken = (token: string | null) => {
    if (this.currentUserToken === token) {
      alert(`Token unchanged: ${token}`);
    } else {
      alert(`Token changed from ${this.currentUserToken} to ${token}`);
      this.currentUserToken = token;
    }
  };

  setCurrentUserRefreshToken = (token: string | null) =>
    (this.currentUserRefreshToken = token);

  setProfileLoading = (isLoading: boolean) => {
    this.profileLoading = isLoading;
  };

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
  };
}
