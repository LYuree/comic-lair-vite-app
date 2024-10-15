import React, { useState } from 'react'
import Container from "./Container";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDot, RxDotFilled } from 'react-icons/rx';

const HomeBanner = () => {
    const slides = [
        {
            url: "/src/images/banner1.webp",
        },
        {
            url: "/src/images/banner2.png",
        },
        {
            url: "/src/images/banner3.png",
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    function prevSlide(){
        setCurrentIndex( currentIndex => {
            return (currentIndex === 0? slides.length - 1 : currentIndex - 1)
        });
    }

    function nextSlide(){
        setCurrentIndex( currentIndex => {
            return (currentIndex === slides.length-1? 0 : currentIndex + 1)
        });
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    }
    
    return (
    <div className='max-w-[1160px] w-full h-[475px] mx-auto mt-4 relative
        group duration-500'>
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="relative w-full h-full bg-center bg-cover"></div>
            <button className='hidden group-hover:block absolute top-[50%] -translate-y-[50%] text-white bg-black/20 rounded-full border-2 border-white cursor-pointer -left-10'>
                <BsChevronCompactLeft size={45} onClick={prevSlide}/>
            </button>
            <button className='hidden group-hover:block absolute top-[50%] -translate-y-[50%] text-white bg-black/20 rounded-full border-2 border-white cursor-pointer -right-10'>
                <BsChevronCompactRight size={45} onClick={nextSlide}/>
            </button>
            <div className="flex relative justify-center py-2 cursor-pointer">
                {slides.map( (_, slideIndex) => (
                    <div key={slideIndex} onClick={() => goToSlide(slideIndex)}
                        className="text-6xl">
                            {slideIndex === currentIndex ? <RxDotFilled className='text-[maroon]'/> : <RxDot />}
                    </div>
                ))}
            </div>
    </div> );
}
 
export default HomeBanner;