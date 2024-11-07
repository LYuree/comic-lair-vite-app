import { IoSearch } from "react-icons/io5";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import { products } from "../utils/products";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TbArrowsSort } from "react-icons/tb";
import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect, useRef } from "react";
import { ItemsPerPageRange } from "../store/gridPageStore"
import { DisplayedProductsStore } from "../store/displayedProductsStore";

const ProductPage = observer(() => {

    // функции для установки текущего номера страницы,
    // числа товаров на страницу,
    // способа сортировки

    // если сами данные о товарах ещё не загружены - загружать;
    // для этого мы импортируем и productsStore тоже

    const {
        productsStore: {products, fetchProducts, productsLoading, sortingMethod, setSortingMethod,
            displayedProducts, setDisplayedProducts},
        gridPageStore : {currentPage, itemsPerPage, gridLoading, setItemsPerPage, setCurrentPage,
            // numberOfPages
        },
    } = rootStore;

    useEffect(() => {
        fetchProducts();
    }, []);

    // if (productsLoading || gridLoading) return <div>Loading</div>
    const numberOfPages = Math.ceil(displayedProducts.data.length / itemsPerPage);
    // console.log(displayedProducts.data);
    const itemCategories = products.data.map(item => item.categories).flat();
    const uniqueCategories = [...new Set(itemCategories)];
    const coverTypes = ["Твердая обложка", "Мягкая обложка"];
    
    const handlePageChange = function(newPage : number){
        setCurrentPage(newPage);
    }

    const checkboxesRef = useRef(Array(uniqueCategories.length)); // массив ссылок на элементы
                                                // checkbox - фильтры по категориям (длина массива
                                                // равна числу уникальных категорий)
    const clearFilters = function () {
        for (const ref of checkboxesRef.current)
            if(ref !== null && ref !== undefined) ref.checked = false;
            // в массиве ссылок откуда-то появляются null -
            // увы, пока не разобрался, откуда
    }

    const applyFilters = function() {
        const newDisplayedProducts = JSON.parse(JSON.stringify(products));
        for (const ref of checkboxesRef.current){
            if(ref !== null && ref !== undefined && ref.checked === true)
                if(ref.name === "category") {
                    newDisplayedProducts.data = newDisplayedProducts.data.filter(
                        (product: IProductItem) => (product.categories.includes(ref.value))
                    );
                    setDisplayedProducts(newDisplayedProducts);
                }
        }
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
            <div className="grid-controls flex flex-row w-full gap-24 my-6 items-center">
                <div>Найдено {displayedProducts.data.length} результатов</div>
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
                <div className="filter-controls">
                    <div className="text-2xl font-bold cursor-pointer my-2 hover:text-[maroon] duration-500" onClick={() => applyFilters()}>ПРИМЕНИТЬ</div>
                    <div className="text-2xl font-bold cursor-pointer text-[maroon]" onClick={() => clearFilters()}>ОЧИСТИТЬ</div>
                </div>
                    <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                        <h2 className="font-bold" key={crypto.randomUUID()}>КАТЕГОРИИ</h2>
                        {uniqueCategories.map((category, i) => 
                            <label htmlFor="" className="block" key={crypto.randomUUID()}>
                                <input type="checkbox" name="category"
                                id={category}
                                key={crypto.randomUUID()}
                                // ref={element => checkboxesRef.current.push(element)}
                                ref={element => checkboxesRef.current[i] = element}
                                value={category}
                                    />
                                    {category}
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                        <h2 className="font-bold" key={crypto.randomUUID()}>ОБЛОЖКА</h2>
                        {coverTypes.map((coverType, i) => 
                            <label htmlFor="" className="block" key={crypto.randomUUID()}>
                                <input type="checkbox" name="" id=""
                                key={crypto.randomUUID()}
                                // ref={element => checkboxesRef.current[checkboxesRef.current.length+i] = element}
                                    />
                                    {coverType}
                            </label>
                        )}
                    </div>
                </div>
                
                <div className="bg-white ml-16">
                    <div className="products-page-grid">
                        {displayedProducts.data.slice(
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
                        
                        {[...Array(Math.ceil(displayedProducts.data.length / itemsPerPage))].map((_, i) => (
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