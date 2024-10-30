import { IoSearch } from "react-icons/io5";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../utils/products";

const ProductPage = () => {
    return ( 
        <Container>
            <div className="grow relative flex items-center my-12">
                <input type="text" name="search-form" id="search-form" placeholder="Поиск..."
                    className="relative outline-none bg-transparent border-2 border-black
                    w-full py-1 px-2
                    cursor-pointer"
                    />
                <label htmlFor="search-form" className="absolute right-0 mr-2">
                    <IoSearch className="relative right-0
                        cursor-pointer text-xl"
                        />
                </label>
            </div>
            <div className="inline-flex content-center">
                <div className="filters flex-column"> {/*inline-flex?*/}
                    <div className="flex-column">
                        <h2 className="font-bold">КАТЕГОРИИ</h2>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            lorem ipsum
                        </label>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            lorem ipsum
                        </label>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            lorem ipsum
                        </label>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            lorem ipsum
                        </label>
                    </div>
                    <div className="flex-column">
                        <h2 className="font-bold">ОБЛОЖКА</h2>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            Твёрдая обложка
                        </label>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            Мягкая обложка
                        </label>
                    </div>
                    <div className="flex-column">
                        <h2 className="font-bold">ФОРМАТ</h2>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            Печатная книга
                        </label>
                        <label htmlFor="" className="block">
                            <input type="checkbox" name="" id="" />
                            Электронная книга
                        </label>
                    </div>
                </div>
                <div className="bg-white ml-16">
                    {/* <div className="products-page-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"> */}
                    <div className="products-page-grid">
                        {products.data.map((product: IProductItem) => {
                            return (<ProductCard key={product.id} data={product}></ProductCard>)
                        })}
                    </div>
                </div>
            </div>
        </Container>
     );
}
 
export default ProductPage;