import { IoSearch } from "react-icons/io5";
import Container from "../Container";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";

const NavBar = () => {
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
        border-b-[1px]
        ">
            <Container>
                <div className="flex
                flex-row
                items-center
                justify-between
                gap-3">
                    <a href="/" className="flex items-center gap-3">
                        <picture>
                            <source />
                            <img
                                src="/src/images/gekko-logo.png"
                                alt="Comic Lair" />
                        </picture>
                        {/* <Image
                        src={gekkoLogoPNG}
                        alt="Comic Lair"
                        width={80}
                        height={80}/> */}
                        <div className="cflex flex-col">
                            <p className="font-bold text-lg">Comic Lair</p>
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
                        <AiOutlineShopping className="cursor-pointer text-2xl hover:text-slate-400"/>
                        <a href="mailto:comiclairsales@gmail.com"
                            className="hover:underline font-bold text-lg">
                            comiclairsales@gmail.com
                        </a>
                    </div>
                </div>
                <ul className="flex
                flex-row
                items-center
                justify-between
                text-lg
                ">
                    <li><a href="#" className="hover:underline">Главная</a></li>
                    <li><a href="#" className="hover:underline">Комиксы</a></li>
                    <li><a href="#" className="hover:underline">Графические новеллы</a></li>
                    <li><a href="#" className="hover:underline">О нас</a></li>
                    <li><a href="#" className="hover:underline">Отзывы</a></li>
                    <li><a href="#" className="hover:underline">Контакты</a></li>
                    <li><a href="#" className="hover:underline">Купим у ВАС!</a></li>
                </ul>
                
            </Container>


        </div>
    </div> );
}
 
export default NavBar;