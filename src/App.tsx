import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./index.css"
import AppContainer from "./components/AppContainer.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

function App() {

    return (
        <div className="app">
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/about" element={<AboutPage/>}></Route>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
