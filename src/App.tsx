import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./index.css"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.tsx";

function App() {

    return (
        <div className="app">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/product:id" element={<ProductDetails/>} />
                    <Route path="*" />
                </Routes>
                <Footer/>
        </div>
    )
}

export default App
