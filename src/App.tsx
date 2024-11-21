import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./index.css"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";

function App() {

    return (
        <div className="app">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/about" element={<AboutPage/>}></Route>
                    <Route path="/products" element={<ProductsPage/>}></Route>
                </Routes>
                <Footer/>
        </div>
    )
}

export default App
