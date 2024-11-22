import { IoSearch } from "react-icons/io5";
import Container from "../Container";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate();

    const redirectToSignIn = () => {
        // (Cookies.get('oauth'))
    }



    return (  <div
    className="
    sticky
    top-0
    w-full
    bg-black
    text-white
    z-30

    ">
        <div className="
        py-4
        ">
            <Container>
                <div className="flex
                flex-row
                items-center
                justify-between
                gap-3">
                    <a href="/" className="flex items-center gap-3 p-2">
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
                    </a>
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
                        <a href="/cart">
                            <AiOutlineShopping className="cursor-pointer text-2xl hover:text-slate-400"/>
                        </a>
                        <a href="mailto:comiclairsales@gmail.com"
                            className="hover:underline font-bold text-lg">
                            comiclairsales@gmail.com
                        </a>
                    </div>
                </div>
                <ul className="flex
                flex-row
                items-center
                justify-around
                text-sm
                ">
                    <li><a href="/" className="hover:underline">Главная</a></li>
                    <li><a href="/products" className="hover:underline">Товары</a></li>
                    <li><a href="/about" className="hover:underline">О нас</a></li>
                    <li><a href="#" className="hover:underline">Купим у ВАС!</a></li>
                    <li><a href="/sign_in" className="font-bold hover:underline">ВОЙТИ</a></li>
                </ul>
                
            </Container>


        </div>
    </div> );
}
 
export default NavBar;