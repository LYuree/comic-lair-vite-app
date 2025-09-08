import { makeAutoObservable, runInAction } from "mobx";
import {
  IOrderJSON,
  fetchOrderDetails,
} from "../api/products/fetchOrderDetails";
import IUser from "../types/user.type";
import { verifyToken } from "../services/auth.service";
import { MyJwtPayload } from "../services/api";
import { jwtDecode } from "jwt-decode";

export class ProfileStore {
  profileLoading: boolean = false;
  authChecked: boolean = false;
  currentUser: IUser | null = null;
  currentUserToken: string | null = null;
  currentUserRefreshToken: string | null = null;
  currentUserRole: string | null = null;
  userOrderDetails: IOrderJSON[] = [];
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  verifyAuth = async () => {
    try {
      const responseData = await verifyToken();
      const accessToken = responseData?.access_token;
      console.log(this);

      if (!accessToken) throw new Error();
      runInAction(() => {
        const decoded = jwtDecode<MyJwtPayload>(accessToken);
        // should I memoize the object literal?
        this.setCurrentUser({
          id: decoded.id,
          role: decoded.role,
          sub: decoded.sub,
        });

        console.log(this.currentUser);
      });
    } catch {
      runInAction(() => {
        this.currentUser = null;
        console.log(this);
      });
    } finally {
      runInAction(() => {
        this.setProfileLoading(false);
        this.authChecked = true;
        console.log(this);
      });
    }
  };

  logout() {
    this.currentUser = null;
    // Additional logout logic like clearing tokens
  }

  setAuthChecked = (value: boolean) => {
    this.authChecked = value;
  };

  setUserOrderDetails = (userOrderDetails: IOrderJSON[]) => {
    console.log("User order details set:", userOrderDetails.length);
    this.userOrderDetails = userOrderDetails;
    console.log(!this.userOrderDetails);
  };

  setCurrentUser = (currentUser: IUser | null) => {
    console.log("set current user called, current user: ", this.currentUser);
    this.currentUser = currentUser;
  };

  setCurrentUserToken = (token: string | null) => {
    if (this.currentUserToken === token) {
      // alert(`Token unchanged: ${token}`);
    } else {
      // alert(`Token changed from ${this.currentUserToken} to ${token}`);
      this.currentUserToken = token;
    }
  };

  setCurrentUserRefreshToken = (token: string | null) =>
    (this.currentUserRefreshToken = token);

  setProfileLoading = (isLoading: boolean) => {
    console.log("Profile loading set to:", isLoading);
    this.profileLoading = isLoading;
  };

  setError = (error: string) => (this.error = error);

  fetchOrderDetails = async (): Promise<void> => {
    console.log("fetchOrderDetails called");

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
