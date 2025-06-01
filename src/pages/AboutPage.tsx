import { FaUnsplash } from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      <div className="max w-full mx-auto mt-4 relative">
        <picture className="relative w-full h-full bg-center bg-cover">
          <source
            media="(min-width: 1280px)"
            srcSet="/src/images/pile_of_comics_1920w.webp"
          />
          <source
            media="(max-width: 1280px)"
            srcSet="/src/images/pile_of_comics_1280w.webp"
          />
          <source
            media="(max-width: 750px)"
            srcSet="/src/images/pile_of_comics_750w.webp"
          />
          <img
            src="/src/images/pile_of_comics_1920w.webp" // Fallback image
            alt="A pile of comics"
            className="w-full h-auto" // Ensure the image is responsive
          />
        </picture>
      </div>
      <div className="ml-4 font-bold ml-auto text-slate-100">
        picture source: Unsplash <FaUnsplash />
      </div>
    </>
  );
};

export default AboutPage;
