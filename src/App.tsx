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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { rootStore } from "./store/index.ts";

// const verifyToken = async () => {
//   try {
//     await api.get("verify-token");
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     setCurrentUser(null);
//     setCurrentUserToken(null);
//     setCurrentUserRefreshToken(null);
//     // Optionally clear token here
//   } finally {
//     setAuthChecked(true);
//   }
// };

const App = observer(() => {
  const {
    profileStore: { verifyAuth, currentUser },
  } = rootStore;
  useEffect(() => {
    verifyAuth();
  }, []);

  // if (profileLoading) {
  //   return <LoadingScreen />;
  // }
  console.log(currentUser ? "user is logged in" : "no user");

  return (
    <div className="app">
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/product_details/:id" element={<ProductDetails />} />
        {currentUser ? (
          <>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
});

export default App;
