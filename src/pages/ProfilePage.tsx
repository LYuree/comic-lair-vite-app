import { FC, useLayoutEffect } from "react";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { IOrderJSON } from "../api/products/fetchOrderDetails";
import { observer } from "mobx-react";
import IUser from "../types/user.type";

// interface IProfilePageProps {
//     currentUser: IUser | undefined;
//   }

interface IOrderItem {
    id: string,
    date: string,
    status: string,
}


// pages/ProfilePage.tsx
interface IProfilePageProps {
    // currentUser: IUser | undefined;
    currentUserRole: string | undefined;
  }
  
  const ProfilePage: FC<IProfilePageProps> = observer(({ currentUserRole }) => {
    const navigate = useNavigate();
  
    const {
      profileStore: { profileLoading, userOrderDetails, fetchOrderDetails },
    } = rootStore;
  
    useLayoutEffect(() => {
      fetchOrderDetails();
    }, []);
  
    if (profileLoading) {
      return <LoadingScreen />;
    }
  
    return (
      <>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>
          <div className="flex flex-wrap justify-between">
            {/* Regular User Section */}
            <div className="w-full md:w-1/2 p-2">
              <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-semibold mb-4">История заказов</h2>
                <ul>
                  {userOrderDetails?.map((order: IOrderJSON) => (
                    <li key={crypto.randomUUID()} className="mb-2">
                      {`Заказ ${order.email} - Id пользователя: ${order.phone}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  
            {/* Admin Section */}
            {currentUserRole === "admin" && (
              <div className="w-full md:w-1/2 p-2">
                <div className="bg-white shadow-md rounded p-4">
                  <h2 className="text-2xl font-semibold mb-4">Администратор</h2>
                  <p>Добро пожаловать, администратор!</p>
                  <button
                    className="mt-4 bg-red-500 text-white p-2 hover:bg-red-600"
                    onClick={() => {
                      // Add admin-specific functionality here
                    }}
                  >
                    Управление пользователями
                  </button>
                </div>
              </div>
            )}
  
            {/* Regular User Info */}
            <div className="w-full md:w-1/2 p-2">
              <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-semibold mb-4">Общая информация о пользователе</h2>
                {/* <p><strong>Имя:</strong> {currentUser?.username}</p> */}
                {/* <p><strong>Электронная почта:</strong> {currentUser?.email}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-[50vw] mx-auto bg-blue-500 text-white p-2 hover:bg-blue-600"
            onClick={() => {
              logout();
              navigate("/signin");
            }}
          >
            Выйти
          </button>
        </div>
      </>
    );
  });
  
  export default ProfilePage;