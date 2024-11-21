import { observer } from "mobx-react";
import { rootStore } from "../store";
import { DiVim } from "react-icons/di";
import { useEffect } from "react";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import CartItem from "../components/CartItem/CartItem";

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
                    {totalCost}
                </div>
            </div>
        </Container>
    );
})
 
export default CartPage;