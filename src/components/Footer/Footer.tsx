import Container from "../Container";
import FooterList from "./FooterList/FooterList.tsx";
import { FaTelegramPlane } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { SiDiscord, SiVk } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm mt-16">
      <div className="bg-[maroon]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center py-8">
            <div className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 md:mb-0">
              THE NOVEL TOWN
            </div>
            <div className="flex justify-center md:justify-end items-center gap-3">
              <a href="#" className="hover:text-gray-400">
                <SiDiscord size={32} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <SiVk size={32} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTelegramPlane size={32} />
              </a>
              <a href="#" className="hover:text-gray-400">
                <AiFillYoutube size={32} />
              </a>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="font-bold text-lg md:text-3xl mb-3">МАГАЗИН</h3>
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
            <h3 className="font-bold text-lg md:text-3xl mb-3">
              THE NOVEL TOWN
            </h3>
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
        <div className="mt-4 border-solid border-white border-t pt-4 text-center">
          Копирование материалов без разрешения запрещено &copy; ООО "The Novel
          Town", {new Date().getFullYear()}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
