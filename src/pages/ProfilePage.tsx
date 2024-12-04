import { FC, useEffect, useLayoutEffect } from "react";
import { getCurrentUser, logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import validateSession from "../services/validateSession";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";


interface IOrderItem {
    id: string,
    date: string,
    status: string,
}

const ProfilePage: FC = () => {
    const navigate = useNavigate();   

    const {
        profileStore : { profileLoading, setProfileLoading }
    } = rootStore;

    useLayoutEffect(() => {
        // как и в CartPage.tsx:
        
        // пытался реализовать валидацию токена пользователя
        // через try-catch и async-await 
        // (при возврате ошибки с сервера в validateSession
        // пользователя должно было бы выбрасывать на страницу логина,
        // но ошибка в validateSession почему-то не отлавливалась
        // блоком catch в этом useLayoutEffect)
        // так что пока сделал просто через промис + catch
        setProfileLoading(true);
        validateSession()
        .then(() => setProfileLoading(false))
        .catch(error => {
            // если с сервера пришла ошибка
            //  с кодом 401 (не авторизован)
            if(error.response &&
                error.response.status &&
                error.response.status === 401){
                logout();
                navigate("/signin");
            }
            else {
                // вариант с рандомной ошибкой без бэкенда,
                // нужно было протестить переход на страницу авторизации
                console.log("Some error has arised...");
                logout();
                navigate("/signin");
            }
        });
    }, []);

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

                                <li className="mb-2">Заказ #1 - Дата: 01.01.2023 - Статус: Завершен</li>
                                <li className="mb-2">Заказ #2 - Дата: 15.01.2023 - Статус: В обработке</li>
                                <li className="mb-2">Заказ #3 - Дата: 20.01.2023 - Статус: Отменен</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2">
                        <div className="bg-white shadow-md rounded p-4">
                            <h2 className="text-2xl font-semibold mb-4">Общая информация о пользователе</h2>
                            {/* Здесь можно добавить компоненты или элементы для отображения информации о пользователе */}
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
                    onClick={logout}
                >
                    Выйти
                </button>
            </div>
            </>
        }
    </>

    )
}
 
export default ProfilePage;