import { FC, useEffect, useLayoutEffect } from "react";
import { getCurrentUser, logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import validateSession from "../services/validateSession";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { IOrderDetails, IOrderJSON } from "../api/products/fetchOrderDetails";
import { observer } from "mobx-react";
import { ProductsData } from "../api/products/fetchProducts";

interface IOrderItem {
    id: string,
    date: string,
    status: string,
}


const ProfilePage: FC = observer(() => {
    const navigate = useNavigate();   

    const {
        profileStore : { profileLoading, setProfileLoading,
            currentUser, setCurrentUser, 
            userOrderDetails, fetchOrderDetails }
    } = rootStore;

    //     // как и в CartPage.tsx:
        
    //     // пытался реализовать валидацию токена пользователя
    //     // через try-catch и async-await 
    //     // (при возврате ошибки с сервера в validateSession
    //     // пользователя должно было бы выбрасывать на страницу логина,
    //     // но ошибка в validateSession почему-то не отлавливалась
    //     // блоком catch в этом useLayoutEffect)
    //     // так что пока сделал просто через промис + catch
        
    //     setProfileLoading(true); //обернуть в промис/await? стейт обновляется асинхронно,
    //                             // неавторизованный пользователь может что-то увидеть
    //                             // до того, как провалит валидацию и его выбросит
    //     validateSession()
    //     .then(() => setProfileLoading(false))
    //     .catch(error => {
    //         // если с сервера пришла ошибка
    //         //  с кодом 401 (не авторизован)
    //         if(error.response &&
    //             error.response.status &&
    //             error.response.status === 401){
    //             logout();
    //             navigate("/signin");
    //         }
    //         else {
    //             // вариант с рандомной ошибкой без бэкенда,
    //             // нужно было протестить переход на страницу авторизации
    //             console.log("Some error has arised...");
    //             logout();
    //             navigate("/signin");
    //         }
    //     });
    // }, []);

    useLayoutEffect(() => {
        fetchOrderDetails();
    }, []);

    const orderSX = userOrderDetails.map((order: IOrderJSON) => {
        <li className="mb-2">{`Заказ ${order.email} - Id пользователя: ${order.phone}`}</li>
    });

    return (
        <>
        {profileLoading ?
            <LoadingScreen/> :
            <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/2 p-2">
                        <div className="bg-white shadow-md rounded p-4">
                            <h2 className="text-2xl font-semibold mb-4">История заказов</h2>
                            <ul>
                                {/* для версии с бэкендом */}
                                {/* {currentUser.orders.map((order: IOrderItem) => {
                                    <li className="mb-2">{`Заказ ${order.id} - Дата: ${order.date} - Статус: ${order.status}`}</li>    
                                })} */}
                                {   
                                    (userOrderDetails ? 
                                            userOrderDetails.map((order: IOrderJSON) => {
                                                return <li key={crypto.randomUUID()} className="mb-2">{`Заказ ${order.email} - Id пользователя: ${order.phone}`}</li>
                                            })
                                        :
                                        "")
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="bg-white shadow-md rounded p-4">
                            <h2 className="text-2xl font-semibold mb-4">Общая информация о пользователе</h2>
                            <p><strong>Имя:</strong> {/*currentUser.name*/} Иван Иванов</p>
                            <p><strong>Электронная почта:</strong> {/*currentUser.email*/} ivan.ivanov@example.com</p>
                            <p><strong>Телефон:</strong> {/*currentUser.phone*/}+7 (999) 123-45-67</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justfy-center">
                <button className="w-[50vw] mx-auto bg-blue-500 text-white p-2  hover:bg-blue-600"
                    type="submit"
                    onClick={() => {
                        logout;
                        navigate("/signin")}
                    }
                    >
                    Выйти
                </button>
            </div>
            </>
        }
    </>

    )
})
 
export default ProfilePage;