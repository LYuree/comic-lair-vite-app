import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { observer } from "mobx-react";
import React, { Suspense, useLayoutEffect } from "react";
import { rootStore } from "./store/index.ts";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";

const HomePage = React.lazy(() => import("./pages/HomePage.tsx"));
const AboutPage = React.lazy(() => import("./pages/AboutPage.tsx"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage.tsx"));
const CartPage = React.lazy(() => import("./pages/CartPage.tsx"));
const SignInPage = React.lazy(() => import("./pages/SignInPage.tsx"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage.tsx"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound.tsx"));
const CheckOutPage = React.lazy(() => import("./pages/CheckoutPage.tsx"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage.tsx"));

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
  useLayoutEffect(() => {
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
      <Suspense fallback={<LoadingScreen />}>
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
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
});

export default App;
