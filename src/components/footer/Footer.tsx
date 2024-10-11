import Container from "../Container";
import FooterList from "./FooterList";
import { LiaTelegramPlane } from "react-icons/lia";
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
        <Container>
            <div className="flex justify-between items-center">
                <div className="text-6xl font-bold pt-8">COMIC LAIR</div>
                <div className="flex items-center pt-8 gap-3">
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
                    <a href="#">Электронные комиксы</a>
                    <a href="#">Печатные комиксы</a>
                    <a href="#">Оплата</a>
                    <a href="#">Доставка</a>
                    <a href="#">Возврат и обмен</a>
                    <a href="#">Программа лояльности</a>
                </FooterList>
                <FooterList>
                    <h3 className="font-bold text-3xl mb-3">COMIC LAIR</h3>
                    <a href="#">О нас</a>
                    <a href="#">Контакты</a>
                    <a href="#">Партнёрам</a>
                </FooterList>
                <FooterList>
                    <a href="#">Пользовательское соглашение</a>
                    <a href="#">Политика конфиденциальности</a>
                </FooterList>
            </div>
            <div className="mt-4 mb-4 border-solid border-white border-t pt-4">
                Копирование материалов без разрешения запрещено &copy; ООО "Comic Lair", {new Date().getFullYear()}
                </div>
        </Container>
    </footer>)
}
 
export default Footer;