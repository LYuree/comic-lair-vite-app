import Slider from './Slider/Slider';
import { Link } from 'react-router-dom';

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

    const slideNodes = slides.map(slide => {
        return(
        <div className='max w-full h-[475px] mx-auto mt-4 relative
        duration-500'>
            <Link to={slide.url}
                key={crypto.randomUUID()}
                >
                    <div style={{backgroundImage: `url(${slide.src})`}}
                        className="relative w-full h-full bg-center bg-cover"></div>
                </Link>
        </div>)
    })
    
    return (
        <>
            <div className="hero-slider max-w-[1189px] mx-auto">
                <Slider
                    slides={slideNodes}
                    slidesPerVP={1}
                    breakPoints={[]}
                    autoPlay={true}
                    isLooped={true}
                    navigate={false}
                    />
            </div>
    </> );
}
 
export default HomeBanner;
