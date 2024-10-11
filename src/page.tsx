import Image from "next/image";
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";


export default function Home() {
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
          // return ( <div>{truncateText(product.name)}</div>)
          return ( <ProductCard key={product.id} data={product}></ProductCard> )
        })}
      </div>
    </Container>
  );
}
