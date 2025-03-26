import { IoSearch } from "react-icons/io5";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard/ProductCard";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TbArrowsSort } from "react-icons/tb";
import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const ProductsPage = observer(() => {
    const {
        productsStore: { products, fetchProducts, productsLoading, sortingMethod, setSortingMethod, displayedProducts, setDisplayedProducts },
        gridPageStore: { currentPage, itemsPerPage, setItemsPerPage, setCurrentPage, categoryCheckboxes, setCategoryCheckboxes, toggleCategoryCheckbox, searchFormValue, setSearchFormValue, coverCheckboxes, setCoverCheckboxes, toggleCoverCheckbox, brandCheckboxes, setBrandCheckboxes, toggleBrandCheckbox, minPrice, maxPrice, setMaxPrice, setPriceRange },
    } = rootStore;

    useEffect(() => {
        fetchProducts();
    }, []);

    const numberOfPages = Math.ceil(displayedProducts.data.length / itemsPerPage);
    const itemCategories = products.data.map(item => item.categories).flat();
    const uniqueCategories = [...new Set(itemCategories)];
    const uniqueCategoryCheckboxes = uniqueCategories.map(category => {
        return {
            id: crypto.randomUUID(),
            categoryName: category,
            checked: false
        }
    });

    const coverTypes = ["Твердая обложка", "Мягкая обложка"];
    const uniqueCoverCheckboxes = coverTypes.map(coverType => {
        return {
            id: crypto.randomUUID(),
            coverType: coverType,
            checked: false
        }
    });

    const itemBrands = products.data.map(item => item.brand);
    const uniqueBrands = [...new Set(itemBrands)];
    const uniqueBrandCheckboxes = uniqueBrands.map(brand => {
        return {
            id: crypto.randomUUID(),
            brandName: brand,
            checked: false
        }
    });

    const pricesAvailable = products.data.map(item => item.price);
    const maxAvailablePrice = Math.max(...pricesAvailable);

    useEffect(() => {
        setCategoryCheckboxes(uniqueCategoryCheckboxes);
        setCoverCheckboxes(uniqueCoverCheckboxes);
        setBrandCheckboxes(uniqueBrandCheckboxes);
        setMaxPrice(maxAvailablePrice);
    }, [products]);

    const handlePageChange = function (newPage: number) {
        setCurrentPage(newPage);
    }

    const clearFilters = function () {
        const newCategoryCheckboxes = categoryCheckboxes.map(checkbox => ({ ...checkbox, checked: false }));
        const newCoverCheckboxes = coverCheckboxes.map(checkbox => ({ ...checkbox, checked: false }));
        const newBrandCheckboxes = brandCheckboxes.map(checkbox => ({ ...checkbox, checked: false }));
        setCategoryCheckboxes(newCategoryCheckboxes);
        setCoverCheckboxes(newCoverCheckboxes);
        setBrandCheckboxes(newBrandCheckboxes);
        setPriceRange(0, maxAvailablePrice);
        setDisplayedProducts(products);
    }

    const applyFilters = function () {
        let newDisplayedProducts = JSON.parse(JSON.stringify(products));

        // Filter by categories
        const selectedCategories = categoryCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.categoryName);
        if (selectedCategories.length > 0) {
            newDisplayedProducts.data = newDisplayedProducts.data.filter((product: IProductItem) =>
                product.categories.some(category => selectedCategories.includes(category))
            );
        }

        // Filter by cover types
        const selectedCovers = coverCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.coverType);
        if (selectedCovers.length > 0) {
            newDisplayedProducts.data = newDisplayedProducts.data.filter((product: IProductItem) =>
                selectedCovers.includes(product.cover_image)
            );
        }

        // Filter by brands
        const selectedBrands = brandCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.brandName);
        if (selectedBrands.length > 0) {
            newDisplayedProducts.data = newDisplayedProducts.data.filter((product: IProductItem) =>
                selectedBrands.includes(product.brand)
            );
        }

        // Filter by price range
        newDisplayedProducts.data = newDisplayedProducts.data.filter((product: IProductItem) =>
            product.price >= minPrice && product.price <= maxPrice
        );

        setDisplayedProducts(newDisplayedProducts);
    }

    const handleSearch = function (inputText: string) {
        setSearchFormValue(inputText);
        const newDisplayedProducts = JSON.parse(JSON.stringify(products));
        if (inputText !== null && inputText !== undefined) {
            newDisplayedProducts.data = newDisplayedProducts.data.filter(
                (product: IProductItem) => {
                    return (product.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1);
                }
            );
            setDisplayedProducts(newDisplayedProducts);
        }
    }

    return (
        <>
            {productsLoading ? <LoadingScreen /> :
                <>
                    <Container>
                        <div className="grow relative flex items-center my-12">
                            <input type="text" name="grid-search-form" id="grid-search-form" placeholder="Поиск..."
                                className="relative outline-none bg-transparent border-2 border-black
                                w-full py-1 px-2
                                cursor-pointer"
                                value={searchFormValue}
                                onChange={e => handleSearch(e.target.value)}
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
                                        onChange={e => {
                                            setItemsPerPage(+e.target.value);
                                            handlePageChange(1);
                                        }}
                                        value={itemsPerPage}
                                    >
                                        <option value="3">3</option>
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
                                            handlePageChange(1);
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
                            <div className="flex flex-col filters gap-2">
                                <div className="filter-controls">
                                    <div className="text-2xl font-bold cursor-pointer my-2 hover:text-[maroon] duration-500" onClick={() => applyFilters()}>ПРИМЕНИТЬ</div>
                                    <div className="text-2xl font-bold cursor-pointer text-[maroon]" onClick={() => clearFilters()}>ОЧИСТИТЬ</div>
                                </div>
                                <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                                    <h2 className="font-bold" key={crypto.randomUUID()}>КАТЕГОРИИ</h2>
                                    {categoryCheckboxes.map((categoryCheckbox, _) =>
                                        <label htmlFor="" className="block" key={crypto.randomUUID()}>
                                            <input type="checkbox" name="category"
                                                id={categoryCheckbox.id}
                                                key={categoryCheckbox.id}
                                                value={categoryCheckbox.categoryName}
                                                checked={categoryCheckbox.checked}
                                                onChange={e => { toggleCategoryCheckbox(categoryCheckbox.id, e.target.checked) }}
                                            />
                                            {categoryCheckbox.categoryName}
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                                    <h2 className="font-bold" key={crypto.randomUUID()}>ОБЛОЖКА</h2>
                                    {coverCheckboxes.map((coverCheckbox, _) =>
                                        <label htmlFor="" className="block" key={crypto.randomUUID()}>
                                            <input type="checkbox" name="cover"
                                                id={coverCheckbox.id}
                                                key={coverCheckbox.id}
                                                value={coverCheckbox.coverType}
                                                checked={coverCheckbox.checked}
                                                onChange={e => { toggleCoverCheckbox(coverCheckbox.id, e.target.checked) }}
                                            />
                                            {coverCheckbox.coverType}
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                                    <h2 className="font-bold" key={crypto.randomUUID()}>БРЕНД</h2>
                                    {brandCheckboxes.map((brandCheckbox, _) =>
                                        <label htmlFor="" className="block" key={crypto.randomUUID()}>
                                            <input type="checkbox" name="brand"
                                                id={brandCheckbox.id}
                                                key={brandCheckbox.id}
                                                value={brandCheckbox.brandName}
                                                checked={brandCheckbox.checked}
                                                onChange={e => { toggleBrandCheckbox(brandCheckbox.id, e.target.checked) }}
                                            />
                                            {brandCheckbox.brandName}
                                        </label>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                                    <h2 className="font-bold" key={crypto.randomUUID()}>ЦЕНА</h2>
                                    <input type="range" min="0" max="1000" step="1" value={minPrice} onChange={e => setPriceRange(Number(e.target.value), maxPrice)} />
                                    <input type="range" min="0" max={maxAvailablePrice} step="1" value={maxPrice} onChange={e => setPriceRange(minPrice, Number(e.target.value))} />
                                    <div>Цена: от {minPrice} до {maxPrice}</div>
                                </div>
                            </div>

                            <div className="bg-white ml-16">
                                <div className="products-page-grid">
                                    {displayedProducts.data.slice(
                                        (currentPage - 1) * itemsPerPage,
                                        currentPage * itemsPerPage
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
                                    <li className="page-item"
                                        onClick={() => {
                                            if (currentPage > 1) handlePageChange(currentPage - 1)
                                        }}>
                                        <a>{"<"}</a>
                                    </li>
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
                                    <li className="page-item"
                                        onClick={() => {
                                            if (currentPage < numberOfPages) handlePageChange(currentPage + 1)
                                        }}>
                                        <a>{">"}</a>
                                    </li>
                                    <li className="page-item" onClick={() => handlePageChange(numberOfPages)}><a>{">>"}</a></li>
                                </ul>
                            </div>
                            :
                            "") //пагинация отключена, кнопки страниц не отображаем
                        }
                    </Container>
                </>
            }
        </>
    );
})

export default ProductsPage;
