import Container from "./Container.tsx";
import HomeBanner from "./HomeBanner.tsx";
import {products} from "../utils/products.tsx";
import ProductCard from "./ProductCard/ProductCard.tsx";

const AppContainer = () => {
    return (
        <Container>
            <div>
                <HomeBanner></HomeBanner>
            </div>
            <div className="flex flex-col items-center my-8">
                <div className="text-4xl border-b-2 border-black mb-2 pb-2">ОТКРОЙТЕ ДЛЯ СЕБЯ</div>
                <h2 className="text-2xl">НОВЕЙШИЕ РЕЛИЗЫ</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
      2xl:grid-cols-6 gap-8">
                {products.map((product: any) => {
                    return ( <ProductCard key={product.id} data={product}></ProductCard> )
                })}
            </div>
        </Container>
    );
};

export default AppContainer;