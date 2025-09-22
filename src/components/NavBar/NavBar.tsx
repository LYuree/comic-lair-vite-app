import { ImCross } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import Container from "../Container";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { rootStore } from "../../store";
import { IProductItem } from "../../api/products/fetchProducts";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { observer } from "mobx-react";

// Define menu items for better maintainability

interface IMenuItem {
  path: string;
  label: string;
  className?: string;
}

const menuItems: IMenuItem[] = [
  { path: "/", label: "Главная" },
  { path: "/products", label: "Товары" },
  { path: "/about", label: "О нас" },
  { path: "#", label: "Купим у ВАС!" },
];

const NavBar = observer(() => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const [menuItems, setMenuItems] = useState(staticMenuItems);
  const {
    profileStore: { currentUser },
  } = rootStore;

  // const profileStore = rootStore.profileStore;

  const searchFormInputRef = useRef(null);
  const searchFormInputMobileRef = useRef(null);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    productsStore: { products, setDisplayedProducts },
    gridPageStore: { setSearchFormValue },
  } = rootStore;

  // Initialize user data
  useEffect(() => {
    if (!localStorage.getItem("cart"))
      localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  const handleSearch = (inputText: string) => {
    setSearchFormValue(inputText);
    if (!products) return;

    // const newDisplayedProducts = JSON.parse(JSON.stringify(products));
    const newDisplayedProducts = structuredClone(products);
    if (inputText) {
      newDisplayedProducts.data = newDisplayedProducts.data.filter(
        (product: IProductItem) =>
          product.name.toLowerCase().includes(inputText.toLowerCase())
      );
    }
    setDisplayedProducts(newDisplayedProducts);
  };

  return (
    <>
      {/* Top Bar */}
      <div
        className={`w-full bg-black text-white z-30 pt-4 sticky top-0 transition-all duration-300 ${
          scrolled ? "pt-2 pb-2" : ""
        }`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3">
            {/* Logo Section */}
            <Link to={"/"} className="flex items-center gap-3 p-2">
              <picture className="relative logo-shadow border-2 border-white">
                <img
                  src="https://iili.io/FOsbNe9.webp"
                  alt="The Novel Town Logo"
                  className="w-10 h-10 object-contain"
                />
              </picture>
              <div className="hidden sm:flex flex-col">
                <p className="font-bold text-lg">The Novel Town</p>
                <div className="text-xs hidden sm:block">
                  <p>Магазин графических</p>
                  <p>новелл и комиксов</p>
                </div>
              </div>
            </Link>

            {/* Search Form - Hidden on mobile */}
            <form
              className="grow relative items-center hidden md:flex"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/products");
              }}
            >
              <input
                type="text"
                name="search-form"
                id="search-form"
                placeholder="Поиск..."
                className="relative outline-none bg-transparent
                          border-2 border-white
                          w-full py-1 px-2
                          cursor-pointer"
                ref={searchFormInputRef}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button type="submit" className="absolute right-0 mr-2">
                <IoSearch className="cursor-pointer text-xl" />
              </button>
            </form>

            {/* Icons Section */}
            <div className="flex items-center gap-3">
              <AiOutlineHeart className="cursor-pointer text-2xl hover:text-slate-400 hidden md:block" />
              <Link to={currentUser ? "/cart" : "/signin"}>
                <AiOutlineShopping className="cursor-pointer text-2xl hover:text-slate-400" />
              </Link>
              <Link to={currentUser ? "/profile" : "/signin"}>
                <FaRegUser className="cursor-pointer text-2xl hover:text-slate-400" />
              </Link>
              <Link
                to={"mailto:comiclairsales@gmail.com"}
                className="hover:underline font-bold text-lg hidden lg:block"
              >
                comiclairsales@gmail.com
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Desktop Menu Bar */}
      <div className="sticky top-0 w-full bg-black text-white z-20 py-4 hidden md:block">
        <Container>
          <ul className="flex flex-row items-center justify-between text-sm">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`hover:underline ${item.className || ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!currentUser && (
              <li>
                <Link
                  to="/signin"
                  className="font-bold hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ВОЙТИ
                </Link>
              </li>
            )}
          </ul>
          <Breadcrumbs />
        </Container>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 z-50 bg-black transition-all duration-300 ease-in-out
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      >
        <div
          className={`
          flex flex-col h-full justify-center items-center z-99
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-10"}
        `}
        >
          {/* Mobile Search Form */}
          <form
            className="relative flex items-center w-4/5 mb-8"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/products");
              setIsMenuOpen(false);
            }}
          >
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full py-2 px-4 bg-white/10 text-white rounded-lg border border-white focus:outline-none"
              onChange={(e) => handleSearch(e.target.value)}
              ref={searchFormInputMobileRef}
            />
            <button type="submit" className="relative right-8 mr-3">
              <IoSearch className="text-xl text-white" />
            </button>
            <button
              type="button"
              className="text-white p-2 cursor-pointer z-100"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <ImCross className="z-102" />
            </button>
          </form>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col items-center gap-8">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`text-white text-xl hover:underline ${
                    item.className || ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!currentUser && (
              <li>
                <Link
                  to="/signin"
                  className="text-white text-xl font-bold hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ВОЙТИ
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Contact Info */}
          <div className="mt-8 text-center">
            <Link
              to={"mailto:comiclairsales@gmail.com"}
              className="hover:underline font-bold text-lg text-white"
            >
              comiclairsales@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export default NavBar;
