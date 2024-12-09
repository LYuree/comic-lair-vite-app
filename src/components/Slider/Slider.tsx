// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ProductCardProps } from '../ProductCard/ProductCard';
import CartItem, { CartItemProps } from '../CartItem/CartItem';
import { FC, ReactNode } from 'react';


interface ISwiperProps{
    slides: ReactNode[],
    slidesPerVP: number,
    breakPoints: {},
    autoPlay: boolean,
    isLooped: boolean,
    navigate: boolean,
    // ref: any
    // maxWidth: number
}

// export default
const Slider: FC<ISwiperProps> = ({slides, slidesPerVP, breakPoints, autoPlay, isLooped, navigate}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, /*Pagination,*/ Scrollbar,
       A11y, Autoplay]}
       loop={isLooped}
    //   spaceBetween={50}
      slidesPerView={slidesPerVP}
      navigation={navigate}
    //   pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      autoplay={autoPlay}
      breakpoints={
        breakPoints
        // {        
        // 368: {
        //     slidesPerView: 1,
        // },
        // 900: {
        //     slidesPerView: 2,
        // }
        //   }
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