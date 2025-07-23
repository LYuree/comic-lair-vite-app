import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FC, ReactNode } from "react";

interface ISwiperProps {
  slides: ReactNode[];
  slidesPerVP: number;
  // breakPoints: object;
  autoPlay: boolean;
  isLooped: boolean;
  navigate: boolean;
}

const Slider: FC<ISwiperProps> = ({
  slides,
  slidesPerVP,
  autoPlay,
  isLooped,
  navigate,
}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, /*Pagination,*/ Scrollbar, A11y, Autoplay]}
      loop={isLooped}
      slidesPerView={slidesPerVP}
      navigation={navigate}
      scrollbar={{ draggable: true }}
      autoplay={autoPlay}
    >
      {slides.map((slide) => {
        return <SwiperSlide key={crypto.randomUUID()}>{slide}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default Slider;
