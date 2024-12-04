import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect, useLayoutEffect } from "react";
import Container from "../components/Container";
import CartItem from "../components/CartItem/CartItem";
import { checkout } from "../api/products/checkout";
import formatPrice from "../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import validateSession from "../services/validateSession";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import Slider from "../components/Slider/Slider";

const userId = "asdasdads010101";

const CartPage = observer(() => {
    const navigate = useNavigate();

    const {
        cartStore : {cartProducts, cartLoading, setCartLoading, fetchCartProducts, setCartProductAmount,
            deleteCartProduct, totalCost},
    }  = rootStore;


    useLayoutEffect(() => {
        // пытался реализовать валидацию токена пользователя
        // через try-catch и async-await 
        // (при возврате ошибки с сервера в validateSession
        // пользователя должно было бы выбрасывать на страницу логина,
        // но ошибка в validateSession почему-то не отлавливалась
        // блоком catch в этом useLayoutEffect)
        // так что пока сделал просто через промис + catch
        
        // setCartLoading(true);
        // validateSession()
        //     .then(() => setCartLoading(false))
        //     .catch(error => {
        //     // если с сервера пришла ошибка
        //     //  с кодом 401 (не авторизован)
        //     if(error.response &&
        //         error.response.status &&
        //         error.response.status === 401){
        //         logout();
        //         navigate("/signin");
        //     }
        //     else {
        //         // вариант с рандомной ошибкой без бэкенда,
        //         // нужно было протестить переход на страницу авторизации
        //         console.log("Some error has arised...");
        //         logout();
        //         navigate("/signin");
        //     }
        // });
    }, []);


    useEffect(() => {
        fetchCartProducts();
    }, []);
    
    const slides = cartProducts.data.map(item => <CartItem key={item.id}
        data={item}
        setAmount={setCartProductAmount}
        deleteItem={deleteCartProduct}/>);

   
    return (
        <>
        {cartLoading ? 
            <LoadingScreen/> 
                :
            <>
                <Container>
                    <div className="flex
                        flex-col
                        lg:flex-row
                        lg:gap-16
                        px-4 py-4
                        mr-8
                        mt-24">
                        <div>
                            <Slider slides={slides}
                                    slidesPerVP={3}
                                    breakPoints={{
                                        368: {
                                            slidesPerView: 1,
                                        },
                                        900: {
                                            slidesPerView: 1,
                                        }
                                    }}
                                    />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="total my-2 text-2xl font-semibold">
                                СУММА ЗАКАЗА: {formatPrice(totalCost)}
                            </div>
                            <a href="/checkout" className="inline">
                                <button type="submit"
                                    className="btn relative inline-flex grow py-1 items-center justify-center overflow-hidden font-medium transition-all bg-indigo-100 hover:bg-white group py-1.5 px-2.5"
                                    onClick={() => checkout(userId, cartProducts)}
                                    >
                                    <span
                                    className="w-56 h-48 bg-[maroon] absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                    <span
                                    className="relative w-full text-center text-[black] transition-colors duration-300 ease-in-out group-hover:text-white">ОФОРМИТЬ ЗАКАЗ</span>
                                </button>
                            </a>
                            <div className="mt-8">
                                <div className="">
                                    <h2 className="text-2xl font-semibold mb-4">Ваши данные</h2>
                                    {/* Здесь можно добавить компоненты или элементы для отображения информации о пользователе */}
                                    <p><strong>Имя:</strong> {/*currentUser.name*/} Иван Иванов</p>
                                    <p><strong>Электронная почта:</strong> {/*currentUser.email*/} ivan.ivanov@example.com</p>
                                    <p><strong>Телефон:</strong> {/*currentUser.phone*/}+7 (999) 123-45-67</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </>
        }
        </>
    );
})
 
export default CartPage;