import "./index.css"
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import CheckOutPage from "./pages/CheckoutPage.tsx";

function App() {

    return (
        <div className="app">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/about" element={<AboutPage/>}></Route>
                    <Route path="/products" element={<ProductsPage/>}></Route>
                    <Route path="/sign_in" element={<SignInPage/>}></Route>
                    <Route path="/sign_up" element={<SignUpPage/>}></Route>
                    <Route path="/account" element={<AccountPage/>}></Route>
                    <Route path="/checkout" element={<CheckOutPage/>}></Route>
                    <Route path="*" element={<PageNotFound/>}></Route>
                </Routes>
                <Footer/>
        </div>
    )
}

export default App
