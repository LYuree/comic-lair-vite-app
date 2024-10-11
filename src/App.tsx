
import HomeBanner from "./components/HomeBanner";
import Container from "./components/Container";
import { products } from "../utils/products";
import ProductCard from "./components/products/ProductCard";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import "./index.css"

function App() {

  return (
    <>
    <NavBar />
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
    <Footer />
    </>
  )
}

export default App
