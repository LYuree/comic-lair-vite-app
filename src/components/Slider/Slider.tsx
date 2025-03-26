// import Swiper core and required modules
import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FC, ReactNode } from 'react';


interface ISwiperProps{
    slides: ReactNode[],
    slidesPerVP: number,
    breakPoints: {},
    autoPlay: boolean,
    isLooped: boolean,
    navigate: boolean,
}

// export default
const Slider: FC<ISwiperProps> = ({slides, slidesPerVP, breakPoints, autoPlay, isLooped, navigate}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, /*Pagination,*/ Scrollbar,
       A11y, Autoplay]}
      loop={isLooped}
      slidesPerView={slidesPerVP}
      navigation={navigate}
      scrollbar={{ draggable: true }}
      autoplay={autoPlay}
      breakpoints={
        breakPoints
    }
    >
        {slides.map(slide => {
            return <SwiperSlide key={crypto.randomUUID()}
              >{slide}</SwiperSlide>
        })}
    </Swiper>
  );
};

export default Slider