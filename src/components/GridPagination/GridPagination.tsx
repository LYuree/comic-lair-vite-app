import { rootStore } from "../../store";

function GridPagination({numberOfProducts}) {
    const {
        gridPageStore : {currentPage, itemsPerPage, setCurrentPage},
        displayedProductsStore : {numberOfDisplayedProducts}
    } = rootStore;


    return (
        <div className="flex flex-row justify-center my-12">
            <ul className="grid-pagination-controls flex gap-6 text-2xl">
                <li className="page-item"><a href="#" onClick={() => setCurrentPage(1)}>{"<<"}</a></li>
                <li className="page-item"><a>{"<"}</a></li>

                <li className="page-item"><a>{">"}</a></li>
                <li className="page-item"><a>{">>"}</a></li>
            </ul>
        </div>
    );
}

export default GridPagination;