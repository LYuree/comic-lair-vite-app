import { IoSearch } from "react-icons/io5";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../utils/products";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TbArrowsSort } from "react-icons/tb";
import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect } from "react";
import { ItemsPerPageRange } from "../store/gridPageStore"

const ProductPage = observer(() => {

    // функции для установки текущего номера страницы,
    // числа товаров на страницу,
    // способа сортировки

    // если сами данные о товарах ещё не загружены - загружать;
    // для этого мы импортируем и productsStore тоже

    const {
        productsStore: {products, fetchProducts, productsLoading, sortingMethod, setSortingMethod},
        gridPageStore : {currentPage, itemsPerPage, gridLoading, setItemsPerPage, setCurrentPage}
    } = rootStore;

    useEffect(() => {
        fetchProducts();
    }, []);

    if (productsLoading || gridLoading) return <div>Loading</div>

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
            <div className="grid-controls flex flex-row w-full gap-24 my-6">
                    <div className="text-2xl font-bold">ОЧИСТИТЬ</div>
                <div>Найдено {products.data.length} результатов</div>
                    <div className="flex flex-row ml-auto">
                        <div className="flex flex-row items-center mx-8">
                            <TfiLayoutGrid3 />
                            <select className="product-grid-page-select" name="" id=""
                                onChange={ e => {setItemsPerPage(+e.target.value)}}
                                value={itemsPerPage}
                                >
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="36">36</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center mx-8">
                            <div>
                                <TbArrowsSort />
                            </div>
                            <select className="product-grid-page-select" name="" id=""
                                value={sortingMethod}
                                onChange={e => setSortingMethod(e.target.value)}
                                >
                                <option value="popular_first">По популярности</option>
                                <option value="cheapest_first">От самых дешёвых</option>
                                <option value="expensive_first">От самых дорогих</option>
                                <option value="A_Z">По алфавиту А-Я</option>
                                <option value="Z_A">По алфавиту Я-А</option>
                                <option value="newest_first">От самых новых</option>
                                <option value="oldest_first">От самых старых</option>
                            </select>
                        </div>
                    </div>
                </div>
            <div className="flex flex-row content-center">
                <div className="flex flex-col filters"> {/*inline-flex?*/}
                    <div className="flex flex-col">
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
                    <div className="flex flex-col">
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
                    <div className="flex flex-col">
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
                        {products.data.slice(
                                (currentPage-1)*itemsPerPage,
                                currentPage*itemsPerPage
                            )
                            .map((product: IProductItem) => {
                            return (<ProductCard key={product.id} data={product}></ProductCard>)
                        })}
                    </div>
                </div>
            </div>
            <div className="mx-auto flex flex-row justify-center gap-6 my-12 text-2xl">
                <div className="page-item">{"<<"}</div>
                <div className="page-item">{"<"}</div>
                <div className="page-item">...</div>
                <div className="page-item">1</div>
                <div className="page-item">2</div>
                <div className="page-item">3</div>
                <div className="page-item">...</div>
                <div className="page-item">{">"}</div>
                <div className="page-item">{">>"}</div>
            </div>
        </Container>
     );
})
 
export default ProductPage;