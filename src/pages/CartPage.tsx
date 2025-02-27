import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect, useLayoutEffect, useRef } from "react";
import Container from "../components/Container";
import CartItem from "../components/CartItem/CartItem";
import formatPrice from "../utils/formatPrice";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import Slider from "../components/Slider/Slider";
import PhoneNumberInput from "../components/PhoneNumberInput/PhoneNumberInput";
import Popup from "../components/Popup/Popup";


// const userId = "asdasdads010101";

const CartPage = observer(() => {
    const {
        cartStore : {
            cartProducts, cartLoading, setCartLoading,
            fetchCartProducts, setCartProductAmount,
            deleteCartProduct, checkout, totalCost,
            email, phone, setEmail, setPhone,
            isCheckoutPopupOpen, setCheckoutPopupOpen},
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

    const handleOpenPopup = () => {
        setCheckoutPopupOpen(true);
        };

    const handleClosePopup = () => {
        setCheckoutPopupOpen(false);
        };
        

    return (
        <>
            
            {cartLoading ? 
                <LoadingScreen/>
                :
                <>
                {(!cartLoading && Array.isArray(cartProducts.data) && !cartProducts.data.length) ?
                    <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-4">
                        <span className="text-2xl font-bold">Ваша корзина пуста.</span>
                        <a className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 inline-block" href="/">Вернуться на главную</a>
                    </div>
                    :
                    <Container>
                        <div className="
                            cart-page-slider-wrapper
                            flex
                            flex-col
                            lg:flex-row
                            lg:gap-16
                            px-4 py-4
                            mr-8
                            mt-24">
                            <div>
                                <Slider slides={slides}
                                        slidesPerVP={1}
                                        autoPlay={false}
                                        isLooped={false}
                                        navigate={true}
                                        breakPoints={{}}
                                        />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="total my-2 text-2xl font-semibold py-8 border-y-2 border-[gray]">
                                    СУММА ЗАКАЗА: <span className="text-[green]">{formatPrice(totalCost)}</span>
                                </div>
                                <div className="flex py-8">
                                    <div className="bg-white w-96">
                                        <h2 className="text-2xl font-bold mb-6 text-start">Оформление заказа</h2>
                                        <div className="text-start">
                                            Пожалуйста, укажите Вашу почту и контактный номер телефона для оформления заказа. Заказ будет рассмотрен, после чего на указанный адрес почты будет выслано письмо с деталями.
                                        </div>
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 pt-4" htmlFor="email">E-mail</label>
                                                <input className="mt-1 block w-full p-2 border border-gray-300"
                                                    type="text" id="email"
                                                    placeholder="Введите e-mail"
                                                    required
                                                    value={email??""}
                                                    onChange={e => {setEmail(e.target.value)}}/>
                                            </div>

                                            <div className="mb-6">
                                                <PhoneNumberInput/>
                                            </div>
                                            <button type="submit"
                                                className="btn w-full relative inline-flex grow py-1 items-center justify-center overflow-hidden font-medium transition-all bg-indigo-100 hover:bg-white group py-1.5 px-2.5"
                                                onClick={() => {
                                                    const userId = localStorage.getItem("userId");
                                                    if (userId && cartProducts &&
                                                        email && phone){
                                                            checkout(userId, phone, email, cartProducts);
                                                            localStorage.setItem("cart", JSON.stringify([]));
                                                        }
                                                    }}
                                                >
                                                <span
                                                className="w-full h-48 bg-[maroon] absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                                <span
                                                className="relative w-full text-center text-[black] transition-colors duration-300 ease-in-out group-hover:text-white">ОФОРМИТЬ ЗАКАЗ</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                }
                </>
            }
            {isCheckoutPopupOpen ? <Popup
                title={"Заказ оформлен"}
                content={`Благодарим за внимание к нашей продукции!
                        Ваш заказ будет рассмотрен в ближайшее время.
                        На указанную почту будет выслано письмо с деталями
                        оплаты.`}
                onClose={() => {handleClosePopup()}}
                /> : ""
            }
        </>
    );
})
 
export default CartPage;