import { IoSearch } from "react-icons/io5";
import Container from "../Container";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";


const NavBar = () => {
    const navigate = useNavigate();

    const redirectToSignIn = () => {
        // (Cookies.get('oauth'))
    }

    if(!localStorage.getItem("cart"))
        localStorage.setItem("cart",
                    JSON.stringify([]));


    return (  
    <>
    <div
    className="
    
    top-0
    w-full
    bg-black
    text-white
    z-30
    pt-4"
    >

            <Container>
                <div className="flex
                flex-row
                items-center
                justify-between
                gap-3">
                    <Link to={"/"} className="flex items-center gap-3 p-2">
                        <picture className="relative logo-shadow border-2 border-white">
                            <source />
                            <img
                                src="/src/images/noveltown_logo_v2.png"
                                alt="The Novel Town Logo" />
                        </picture>
                        <div className="cflex flex-col">
                            <p className="font-bold text-lg">The Novel Town</p>
                            <div className="text-xs">
                                <p>Магазин графических</p>
                                <p>новелл и комиксов</p>
                            </div>
                        </div>
                    </Link>
                    <div className="grow relative flex items-center">
                        <input type="text" name="search-form" id="search-form" placeholder="Поиск..."
                            className="relative outline-none bg-transparent border-2 border-white
                            w-full py-1 px-2
                            cursor-pointer"
                            />
                        <label htmlFor="search-form" className="absolute right-0 mr-2">
                            <IoSearch className="relative right-0
                                cursor-pointer text-xl"
                                />
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <AiOutlineHeart className="cursor-pointer text-2xl hover:text-slate-400" />
                        <Link to={"/cart"}>
                            <AiOutlineShopping className="cursor-pointer text-2xl hover:text-slate-400"/>
                        </Link>
                        <Link to={"/profile"}>
                            <FaRegUser className="cursor-pointer text-2xl hover:text-slate-400"/>
                        </Link>
                        <Link to={"mailto:comiclairsales@gmail.com"}
                            className="hover:underline font-bold text-lg">
                            comiclairsales@gmail.com
                        </Link>
                    </div>
                </div>
                {/* <ul className="flex
                flex-row
                items-center
                justify-around
                text-sm
                ">
                    <li><Link to={"/"} className="hover:underline">Главная</Link></li>
                    <li><Link to={"/products"} className="hover:underline">Товары</Link></li>
                    <li><Link to={"/about"} className="hover:underline">О нас</Link></li>
                    <li><Link to={"#"} className="hover:underline">Купим у ВАС!</Link></li>
                    <li><Link to={"/signin"} className="font-bold hover:underline">ВОЙТИ</Link></li>
                </ul>                 */}
            </Container>
    </div>
    <div
    className="
    sticky
    top-0
    w-full
    bg-black
    text-white
    z-30
    py-4"
    >
    <Container>
        <ul className="flex
                    flex-row
                    items-center
                    justify-around
                    text-sm
                    ">
                        <li><Link to={"/"} className="hover:underline">Главная</Link></li>
                        <li><Link to={"/products"} className="hover:underline">Товары</Link></li>
                        <li><Link to={"/about"} className="hover:underline">О нас</Link></li>
                        <li><Link to={"#"} className="hover:underline">Купим у ВАС!</Link></li>
                        <li><Link to={"/signin"} className="font-bold hover:underline">ВОЙТИ</Link></li>
                    </ul>
    </Container>
    </div>
    </> );
}
 
export default NavBar;