import { FC } from "react";
import { getCurrentUser, logout } from "../services/auth.service";


interface IOrderItem {
    id: string,
    date: string,
    status: string,
}

const ProfilePage: FC = () => {
    const currentUser = getCurrentUser();

    return (
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

    )
}
 
export default ProfilePage;