import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";
import {products} from "../utils/products.tsx";
import ProductCard from "../components/ProductCard/ProductCard";

const HomePage = () => {
    return ( 
        <>
            <Container>
                <div>
                    <HomeBanner></HomeBanner>
                </div>
                <div className="bg-white relative">
                    <div className="text-center text-5xl mt-24 pb-8 border-b-2 border-black w-3/4 mx-auto">ОТКРОЙТЕ ДЛЯ СЕБЯ</div> {/*border-b-2 border-black*/}
                    <h2 className="text-4xl text-center mb-16 mt-8">НОВЕЙШИЕ РЕЛИЗЫ</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            2xl:grid-cols-6 gap-8">
                            {products.map((product: any) => {
                                return ( <ProductCard key={product.id} data={product}></ProductCard> )
                            })}
                        </div>
                </div>
            </Container>
            <Container>
            <div className="relative bg-black flex justify-between items-center p-8 my-8">
                <div className="text-white font-bold text-lg md:text-2xl lg:text-3xl">СКИДКА ДО 15% ЗА ПЕРВУЮ ПОКУПКУ</div>
                <picture>
                    <source />
                    <img src="/src/images/discount2.png" alt="discount 15%" className="homepage-discount-pic absolute -top-[0px] -translate-y-1/4 right-0"/>
                </picture>
            </div>
            </Container>

            <Container>
                <div className="bg-white">
                <h2 className="text-4xl text-center mb-16 mt-8 border-b-2 border-black w-3/4 mx-auto min-w-min pb-4">ХИТЫ</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                        2xl:grid-cols-6 gap-8">
                        {products.map((product: any) => {
                            return ( <ProductCard key={product.id} data={product}></ProductCard> )
                        })}
                    </div>
                </div>
            </Container>

            <Container>
            <div className="relative bg-black flex justify-between items-center p-8 my-8">
                <div className="text-white font-bold text-lg md:text-2xl lg:text-3xl">БЕСПЛАТНАЯ ДОСТАВКА ОТ 2000Р</div>
                <picture>
                    <source />
                    <img src="/src/images/spaceship.png" alt="discount 15%" className="
                        absolute
                        -top-[0px]
                        -translate-y-1/4
                        right-0
                        drop-shadow-[4px_4px_4px_#1c1c1c66]"/>
                </picture>
            </div>
            </Container>

            <Container>
                <div className="bg-white">
                <h2 className="text-4xl text-center mb-16 mt-8 border-b-2 border-black w-3/4 mx-auto min-w-min pb-4">СКИДКИ</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                        2xl:grid-cols-6 gap-8">
                        {products.map((product: any) => {
                            return ( <ProductCard key={product.id} data={product}></ProductCard> )
                        })}
                    </div>
                </div>
            </Container>

            <Container>
            <div className="relative bg-black flex justify-between items-center p-8 my-8">
                <div className="text-white font-bold text-lg md:text-2xl lg:text-3xl">Будьте в курсе новостей: важнейшие акции и релизы</div>
                {/* <button className="text-white border-2 border-solid-white px-4 py-2 ">ПОДПИСАТЬСЯ</button> */}
                <button className="relative inline-block font-medium group py-2 px-4">
                    <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-[#ffbc13] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-black border-2 border-[#ffbc13]"></span>
                    <span className="relative text-white">ПОДПИСАТЬСЯ</span>
                </button>
            </div>
            </Container>


        </>
    );
}
 
export default HomePage;
