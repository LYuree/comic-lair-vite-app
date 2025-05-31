import Slider from "./Slider/Slider";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const slides = [
    {
      src: "/src/images/banner1.png",
      src_360w: "/src/images/banner1_360w_mobile.webp",

      url: "/products",
    },
    {
      src: "/src/images/banner2.png",
      src_360w: "/src/images/banner2_360w_mobile.webp",

      url: "/products",
    },
    {
      src: "/src/images/banner3.png",
      src_360w: "/src/images/banner3_360w_mobile.webp",

      url: "/products",
    },
  ];

  //   const slideNodes = slides.map((slide) => {
  //     return (
  //       <div
  //         className="max w-full h-[475px] mx-auto mt-4 relative
  //         duration-500"
  //       >
  //         <Link to={slide.url} key={crypto.randomUUID()}>
  //           <div
  //             style={{ backgroundImage: `url(${slide.src})` }}
  //             className="relative w-full h-full bg-center bg-cover"
  //           ></div>
  //         </Link>
  //       </div>
  //     );
  //   });

  const slideNodes = slides.map((slide) => {
    return (
      <div
        className="max w-full mx-auto mt-4 relative
          duration-500"
      >
        <Link to={slide.url} key={crypto.randomUUID()}>
          <picture className="relative w-full h-full bg-center bg-cover">
            <source media="(max-width: 600px)" srcSet={slide.src_360w} />
            {/* <source media="(max-width: 1200px) and (min-width: 601px)" srcSet={slide.} /> */}
            <source media="(min-width: 1201px)" />
            <img src={slide.src} alt="" />
          </picture>
        </Link>
      </div>
    );
  });

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
    </>
  );
};

export default HomeBanner;
