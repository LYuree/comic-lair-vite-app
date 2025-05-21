import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProductItem } from "../api/products/fetchProducts";
import { rootStore } from "../store";
import { observer } from "mobx-react";
import { Button } from "@mui/material";
import formatPrice from "../utils/formatPrice";

const ProductDetails: React.FC = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    productsStore: { products, fetchProducts },
    productDetailsStore: { productDetails, setProductDetails },
  } = rootStore;

  const getProductData = async (): Promise<IProductItem | null> => {
    try {
      if (!products.data.length) {
        await fetchProducts();
      }
      if (id) {
        const item = products.data.find(
          (item: IProductItem) => item.id === +id
        );
        return item || null;
      }
      return null;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      const result = await getProductData();
      setProductDetails(result);
      setLoading(false);

      if (!result) {
        navigate("/404");
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!productDetails) {
    return null; // The navigate("/404") will handle this case
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image Section */}
          <div className="flex flex-col">
            <div className="border lg overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <img
                src={productDetails.cover_image}
                alt={productDetails.name}
                className="w-full max-h-[500px] object-contain"
              />
            </div>
            {/* {productDetails.images && productDetails.images.length > 0 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
                {productDetails.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border rounded cursor-pointer hover:border-blue-500"
                  >
                    <img
                      src={image}
                      alt={`${productDetails.name} - ${index + 1}`}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            )} */}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {productDetails.name}
            </h1>

            {productDetails.brand && (
              <p className="text-lg text-gray-600 mb-4">
                Издатель: {productDetails.brand}
              </p>
            )}

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 mr-4">
                {formatPrice(+productDetails.price)}
              </span>
              {productDetails.discount! > 0 && (
                <span className="text-lg text-red-500 line-through">
                  {formatPrice(productDetails.price + productDetails.discount!)}
                </span>
              )}
            </div>

            {productDetails.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Описание</h2>
                <p className="text-gray-700">{productDetails.description}</p>
              </div>
            )}

            {productDetails.categories &&
              productDetails.categories.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Категории</h2>
                  <div className="flex flex-wrap gap-2">
                    {productDetails.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-3 py-1 full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-auto">
              {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 lg transition duration-200"> */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: 0,
                  // border: 2,
                  // borderColor: "primary.main",
                  // color: "black",
                }}
              >
                Добавить в корзину
              </Button>
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetails;
