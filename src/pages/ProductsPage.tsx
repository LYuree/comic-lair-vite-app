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
import { DisplayedProductsStore } from "../store/displayedProductsStore";

const ProductPage = observer(() => {

    // функции для установки текущего номера страницы,
    // числа товаров на страницу,
    // способа сортировки

    // если сами данные о товарах ещё не загружены - загружать;
    // для этого мы импортируем и productsStore тоже

    const {
        productsStore: {products, fetchProducts, productsLoading, sortingMethod, setSortingMethod},
        gridPageStore : {currentPage, itemsPerPage, gridLoading, setItemsPerPage, setCurrentPage
            // numberOfPages
        },
    } = rootStore;

    useEffect(() => {
        fetchProducts();
    }, []);

    // if (productsLoading || gridLoading) return <div>Loading</div>
    const displayedProducts = products.data.slice(0, products.data.length);
    const numberOfPages = Math.ceil(displayedProducts.length / itemsPerPage);
    const itemCategories = products.data.map(item => item.categories).flat();
    const uniqueCategories = [...new Set(itemCategories)];

    const handlePageChange = (newPage : number) => {
        setCurrentPage(newPage);
    }

    return ( 
        <Container>
            <div className="grow relative flex items-center my-12">
                <input type="text" name="grid-search-form" id="grid-search-form" placeholder="Поиск..."
                    className="relative outline-none bg-transparent border-2 border-black
                    w-full py-1 px-2
                    cursor-pointer"
                    />
                <label htmlFor="grid-search-form" className="absolute right-0 mr-2">
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
                                <option value="3">3</option> {/* опция для отладки */}
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
                                onChange={e => {
                                    setSortingMethod(e.target.value);
                                }}
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
                <div className="flex flex-col filters gap-2"> {/*inline-flex?*/}
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold">КАТЕГОРИИ</h2>
                        {uniqueCategories.map((category) => 
                            <label htmlFor="" className="block">
                                <input type="checkbox" name="" id="" />
                                    {category}
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
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
                </div>
                <div className="bg-white ml-16">
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
            {(numberOfPages > 1 ?
                <div className="flex flex-row justify-center my-12">
                    <ul className="grid-pagination-controls flex gap-6 text-2xl">
                        <li className="page-item" onClick={() => handlePageChange(1)}><a href="#">{"<<"}</a></li>
                        <li className="page-item" onClick={() => handlePageChange(currentPage-1)}><a>{"<"}</a></li>
                        {(currentPage > 3 ? <li className="page-item">...</li> : "")}
                        
                        {[...Array(Math.ceil(displayedProducts.length / itemsPerPage))].map((_, i) => (
                            <li
                            className={`page__number ${
                                currentPage === i + 1 ? "selected__page__number" : ""
                            }`}
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            >
                            <a>{i + 1}</a>
                            </li>
                        ))}
                        

                        {/* {(currentPage < numberOfPages - 2 ? <li className="page-item">...</li> : <li className="page-item"><a>{numberOfPages}</a></li>)} */}
                        <li className="page-item" onClick={() => handlePageChange(currentPage+1)}><a>{">"}</a></li>
                        <li className="page-item" onClick={() => handlePageChange(numberOfPages)}><a>{">>"}</a></li>
                    </ul>
                </div>
                :
                "") //пагинация отключена, кнопки страниц не отображаем
            }
        </Container>
     );
})
 
export default ProductPage;