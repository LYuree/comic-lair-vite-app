import { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDot, RxDotFilled } from 'react-icons/rx';

const HomeBanner = () => {
    const slides = [
        {
            src: "/src/images/banner1.png",
            url: "/products"
        },
        {
            src: "/src/images/banner2.png",
            url: "/products"
        },
        {
            src: "/src/images/banner3.png",
            url: "/products"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide() => {
        setCurrentIndex( currentIndex => {
            return (currentIndex === 0? slides.length - 1 : currentIndex - 1)
        });
    }

    const nextSlide = () => {
        setCurrentIndex( currentIndex => {
            return (currentIndex === slides.length-1? 0 : currentIndex + 1)
        });
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    }
    
    return (
    <div className='max-w-[1160px] w-full h-[475px] mx-auto mt-4 relative
        duration-500'>
            <a href={slides[currentIndex].url}>
                <div style={{backgroundImage: `url(${slides[currentIndex].src})`}} className="relative w-full h-full bg-center bg-cover"></div>
            </a>
            <button className='group absolute top-[50%] -translate-y-[50%] text-black bg-white border-2 border-black cursor-pointer -left-10'>
            <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <BsChevronCompactLeft size={45} className='relative bg-white' onClick={prevSlide}/>
            </button>
            <button className='group absolute top-[50%] -translate-y-[50%] text-black bg-white border-2 border-black cursor-pointer -right-10'>
                <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <BsChevronCompactRight size={45} className='relative bg-white' onClick={nextSlide}/>
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
