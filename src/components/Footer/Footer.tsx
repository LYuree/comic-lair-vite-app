import Container from "../Container";
import FooterList from "./FooterList/FooterList.tsx";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { SiDiscord, SiVk } from "react-icons/si";

const Footer = () => {
    return (<footer className="
    bg-black
    text-white
    text-sm
    mt-16
    ">
            <div className="bg-violet-900">
            <Container>
                <div className="flex justify-between items-center py-8">
                    <div className="text-6xl font-bold">COMIC LAIR</div>
                    <div className="flex items-center gap-3">
                            <a href="#">
                                <SiDiscord size={48}></SiDiscord>
                            </a>
                            <a href="#">
                                <SiVk size={48}></SiVk>
                            </a>
                            <a href="#">
                                <FaTelegramPlane size={48}></FaTelegramPlane>
                            </a>
                            <a href="#">
                                <AiFillYoutube size={48}></AiFillYoutube>
                            </a>
                    </div>
                </div>
                </Container>
            </div>
            <Container>
            <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            pt-16
            pb-8
            ">
                <FooterList>
                    <h3 className="font-bold text-3xl mb-3">МАГАЗИН</h3>
                    <div className="children-hover-gray">
                        <a href="#">Электронные комиксы</a>
                        <a href="#">Печатные комиксы</a>
                        <a href="#">Оплата</a>
                        <a href="#">Доставка</a>
                        <a href="#">Возврат и обмен</a>
                        <a href="#">Программа лояльности</a>
                    </div>
                </FooterList>
                <FooterList>
                    <h3 className="font-bold text-3xl mb-3">COMIC LAIR</h3>
                    <div className="children-hover-gray">
                        <a href="#">О нас</a>
                        <a href="#">Контакты</a>
                        <a href="#">Партнёрам</a>
                    </div>
                </FooterList>
                <FooterList>
                    <div className="children-hover-gray">
                        <a href="#">Пользовательское соглашение</a>
                        <a href="#">Политика конфиденциальности</a>
                    </div>
                </FooterList>
            </div>
            <div className="mt-4 mb-4 border-solid border-white border-t pt-4">
                Копирование материалов без разрешения запрещено &copy; ООО "Comic Lair", {new Date().getFullYear()}
                </div>
        </Container>
    </footer>)
}
 
export default Footer;