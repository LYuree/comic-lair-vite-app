import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProductItem } from "../api/products/fetchProducts";
import { rootStore } from "../store";
import { observer } from "mobx-react";

const ProductDetails: React.FC = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    productsStore: { products, fetchProducts },
    productDetailsStore: { productDetails, setProductDetails },
  } = rootStore;

  const getProductData = async (): Promise<IProductItem | null | undefined> => {
    let itemDetails = null;
    if (Array.isArray(products) && products.length === 0) await fetchProducts();
    if (id)
      itemDetails = products.data.find((item: IProductItem) => item.id === +id);
    console.log(itemDetails);
    return itemDetails;
  };

  let itemDetails: IProductItem | null | undefined = null;
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (id) {
        const result = await getProductData();
        itemDetails = result;
        setProductDetails(itemDetails);
        console.log(itemDetails);
      }
    };
    fetchItemDetails();
  }, []);

  console.log(productDetails);
  if (productDetails)
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* <img src={productDetails.images[0].image} alt={productDetails.name} className="w-full h-auto object-contain" /> */}
            <img
              src={productDetails.cover_image}
              alt={productDetails.name}
              className="w-full h-auto object-contain"
            />
            {/* вывод разных картинок одного и того же товара, надо будет доделать*/}
            {/* <div className="mt-4">
                {productDetails.images.map((image, index) => (
                <img key={index} src={image} alt={productDetails.name} className="w-24 h-24 object-contain mr-2" />
                ))}
            </div> */}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{productDetails.name}</h1>
            <p className="text-lg mb-4">{productDetails.description}</p>
            <p className="text-2xl font-bold mb-4">
              Price: ${productDetails.price.toFixed(2)}
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  else {
    navigate("/404");
  }
});

export default ProductDetails;
