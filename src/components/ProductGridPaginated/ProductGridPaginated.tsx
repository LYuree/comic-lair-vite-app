import { IProductItem } from "../../api/products/fetchProducts";
import { products } from "../../utils/products";
import ProductCard from "../ProductCard/ProductCard";


function ProductGridPaginated() {
    return ( 
        <div className="products-page-grid">
            {products.data.map((product: IProductItem) => {
                return (<ProductCard key={product.id} data={product}></ProductCard>)
            })}
        </div>
     );
}

export default ProductGridPaginated;