import { observer } from "mobx-react";
import { rootStore } from "../store";
import { DiVim } from "react-icons/di";
import { useEffect } from "react";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import CartItem from "../components/CartItem/CartItem";
import { checkout } from "../api/products/checkout";

const userId = "asdasdads010101";

const CartPage = observer(() => {
    const {
        cartStore : {cartProducts, fetchCartProducts, setCartProductAmount,
            deleteCartProduct}
    }  = rootStore;

    useEffect(() => {
        fetchCartProducts();
    }, []);

    // if (cartProductsLoading) return <div>Loading</div>

    const totalCost = cartProducts.data.reduce((accumulator, currentProduct: IProductItem) =>
        accumulator + currentProduct.price*(1 - currentProduct.discount)*currentProduct.amount, 0);
    
    return (
        <Container>
            <div className="flex-col">
                {cartProducts.data.map(item => <CartItem key={item.id}
                    data={item}
                    setAmount={setCartProductAmount}
                    deleteItem={deleteCartProduct}/>)
                }
                <div className="total my-2">
                    СУММА ЗАКАЗА: {totalCost}
                </div>
            </div>
            <button type="submit"
                className="btn relative inline-flex grow py-1 items-center justify-center overflow-hidden font-medium transition-all bg-indigo-100 hover:bg-white group py-1.5 px-2.5"
                onClick={checkout(userId, cartProducts)}
                >
                <span
                className="w-56 h-48 bg-[maroon] absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span
                className="relative w-full text-center text-[black] transition-colors duration-300 ease-in-out group-hover:text-white">ОФОРМИТЬ ЗАКАЗ</span>
            </button>
        </Container>
    );
})
 
export default CartPage;