import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";
import ProductCard from "../components/ProductCard/ProductCard";
import { rootStore } from "../store";
import { IProductItem } from "../api/products/fetchProducts.ts";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useInView } from "react-intersection-observer";

const HomePage = observer(() => {
  const {
    productsStore: { products, fetchProducts, productsLoading },
  } = rootStore;

  const [, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchProducts();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev: any) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Helper component for animated sections
  const AnimatedSection = ({
    id,
    children,
    className = "",
  }: {
    id: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const opacity = inView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10";

    return (
      <div
        id={id}
        ref={(el) => {
          ref(el);
          sectionRefs.current.push(el);
        }}
        className={
          `transition-all duration-700 ease-out 
          ${opacity}` + { className }
        }
      >
        {children}
      </div>
    );
  };

  return (
    <>
      {productsLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container>
            <AnimatedSection id="banner">
              <div>
                <HomeBanner></HomeBanner>
              </div>
            </AnimatedSection>
          </Container>

          <Container>
            <AnimatedSection id="new-releases" className="bg-white relative">
              <div className="text-center text-2xl md:text-5xl mt-12 pb-8 border-b-2 border-black w-3/4 mx-auto">
                ОТКРОЙТЕ ДЛЯ СЕБЯ
              </div>
              <h2 className="text-2xl md:text-4xl text-center mb-16 mt-8">
                НОВЕЙШИЕ РЕЛИЗЫ
              </h2>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            2xl:grid-cols-6 gap-8"
              >
                {products.data
                  ? products.data.map((product: IProductItem) => (
                      <ProductCard key={product.id} data={product} />
                    ))
                  : null}
              </div>
              <div className="relative bg-black flex flex-col sm:flex-row sm:justify-between sm:items-center p-8 my-8">
                <div className="text-white font-bold text-base max-w-[120px] md:max-w-full md:text-2xl lg:text-3xl">
                  СКИДКА ДО 15% ЗА ПЕРВУЮ ПОКУПКУ
                </div>
                <picture>
                  <source />
                  <img
                    src="https://iili.io/FOsmuIe.webp"
                    alt="discount 15%"
                    className="homepage-discount-pic absolute right-0 lg:-top-[0px] lg:-translate-y-[20%] -translate-y-[50%]"
                  />
                </picture>
              </div>
            </AnimatedSection>
          </Container>

          <Container>
            <AnimatedSection id="hits" className="bg-white">
              <h2 className="text-2xl md:text-4xl text-center mb-16 mt-8 border-b-2 border-black w-3/4 mx-auto min-w-min pb-4">
                ХИТЫ
              </h2>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                        2xl:grid-cols-6 gap-8"
              >
                {products.data
                  ? products.data.map((product: IProductItem) => (
                      <ProductCard key={product.id} data={product} />
                    ))
                  : null}
              </div>
              <div className="relative bg-black flex flex-col sm:flex-row sm:justify-between sm:items-center p-8 my-8">
                <div className="text-white font-bold text-base max-w-[120px] md:max-w-full md:text-2xl lg:text-3xl">
                  БЕСПЛАТНАЯ ДОСТАВКА ОТ 2000Р
                </div>
                <picture>
                  <source />
                  <img
                    src="https://iili.io/FOsmFXs.webp"
                    alt="discount 15%"
                    className="
                        absolute
                        top-1/2
                        -translate-y-1/2
                        right-0
                        drop-shadow-[4px_4px_4px_#1c1c1c66]
                        max-w-[200px]
                        sm:max-w-full
                        "
                  />
                </picture>
              </div>
            </AnimatedSection>
          </Container>

          <Container>
            <AnimatedSection id="sales" className="bg-white">
              <h2 className="text-2xl md:text-4xl text-center mb-16 mt-8 border-b-2 border-black w-3/4 mx-auto min-w-min pb-4">
                СКИДКИ
              </h2>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                        2xl:grid-cols-6 gap-8"
              >
                {products.data
                  ? products.data.map((product: IProductItem) => (
                      <ProductCard key={product.id} data={product} />
                    ))
                  : null}
              </div>
            </AnimatedSection>
          </Container>

          <Container>
            <AnimatedSection
              id="newsletter"
              className="relative bg-black flex justify-between items-center p-8 my-8"
            >
              <div className="relative bg-black flex justify-between items-center p-8 my-8">
                <div className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
                  Будьте в курсе новостей: важнейшие акции и релизы
                </div>
                <button className="relative inline-block font-medium group py-2 px-4">
                  <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-[#ffbc13] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-black border-2 border-[#ffbc13]"></span>
                  <span className="relative text-white">ПОДПИСАТЬСЯ</span>
                </button>
              </div>
            </AnimatedSection>
          </Container>
        </>
      )}
    </>
  );
});

export default HomePage;
