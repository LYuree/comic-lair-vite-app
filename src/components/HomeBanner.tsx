import Slider from "./Slider/Slider";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const slides = [
    {
      src: "https://iili.io/FOsmqBf.webp",
      src_360w: "https://iili.io/FeuYGwB.webp",

      url: "/products",
    },
    {
      src: "https://iili.io/FOsmx7S.webp",
      src_360w: "https://iili.io/FeuYMZP.webp",

      url: "/products",
    },
    {
      src: "https://iili.io/FOsmo22.webp",
      src_360w: "https://iili.io/FeAdMml.webp",

      url: "/products",
    },
  ];

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
            <source media="(min-width: 1201px)" srcSet={slide.src} />
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
          autoPlay={true}
          isLooped={true}
          navigate={false}
        />
      </div>
    </>
  );
};

export default HomeBanner;
