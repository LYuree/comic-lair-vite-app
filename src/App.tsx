import "./index.css";
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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import axios from "axios";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //     // For future use: user roles
  //     // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
  //     // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
  //   }

  //   eventBus.on("logout", logOut);

  //   return () => {
  //     EventBus.remove("logout", logOut);
  //   };
  // }, []);
  const [currentUserRole, setCurrentUserRole] = useState("");


  useEffect(() => {
    const getCurrentUserRole = async () => {
      try {
        const response = await axios.get('/get-role', { withCredentials: true });
        setCurrentUserRole(response.data.role);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(err.response?.data.detail || 'An error occurred');
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    getCurrentUserRole();

  })

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


  return (
    <div className="app">
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/product_details/:id" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage currentUserRole={currentUserRole}/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;