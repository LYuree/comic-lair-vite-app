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
import CheckOutPage from "./pages/CheckoutPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import eventBus from "./common/EventBus.ts";
import { useEffect, useState } from "react";
import IUser from "./types/user.type.ts";
import EventBus from "./common/EventBus";

import * as AuthService from "./services/auth.service";


function App() {

    const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
          setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
          setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    
        eventBus.on("logout", logOut);
    
        return () => {
          EventBus.remove("logout", logOut);
        };
        }, []);
    
      const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };


    return (
        <div className="app">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/about" element={<AboutPage/>}></Route>
                    <Route path="/products" element={<ProductsPage/>}></Route>
                    <Route path="/signin" element={<SignInPage/>}></Route>
                    <Route path="/signup" element={<SignUpPage/>}></Route>
                    <Route path="/profile" element={<ProfilePage/>}></Route>
                    <Route path="/checkout" element={<CheckOutPage/>}></Route>
                    <Route path="*" element={<PageNotFound/>}></Route>
                </Routes>
                <Footer/>
        </div>
    )
}

// function App() {

//     //check jwt token
//     const token = localStorage.getItem("token");
//     if (token) {
//         setAuthToken(token);
//     }
  
//     return (
//       <div className="App">
//         <Routers/>
//       </div>
//     );
//   }
  
//   export default App;

export default App
