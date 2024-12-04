// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

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
    // maxWidth: number
}

// export default
const Slider: FC<ISwiperProps> = ({slides, slidesPerVP, breakPoints}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, /*Pagination,*/ Scrollbar, A11y]}
    //   spaceBetween={50}
      slidesPerView={slidesPerVP}
      navigation
    //   pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
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
            return <SwiperSlide>{slide}</SwiperSlide>
        })}
    </Swiper>
  );
};

export default Slider