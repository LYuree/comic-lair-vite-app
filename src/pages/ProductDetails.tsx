// import React, { useEffect } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import { IProductItem, fetchProducts } from '../api/products/fetchProducts';
// import { rootStore } from '../store';
// import { observer } from 'mobx-react';

// // Replace with your actual product data fetching mechanism
// const getProductData = async (id: number): Promise<IProductItem|null|undefined> => {

//   const [searchParams] = useSearchParams();
//   const itemId = searchParams.get("id");

//   const {
//     productsStore: {products, fetchProducts, productsLoading},
//     } = rootStore;

//   useEffect(()=>{
//     fetchProducts();
//   },[]);
    
//   let itemDetails = null;
//   if(itemId)
//     itemDetails = products.data.find((item: IProductItem) => item.id === +itemId);


//   // Simulate fetching data - replace with your API call
//   return itemDetails;
// };


// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   images: string[];
// }

// const ProductDetails: React.FC = observer(() => {
//   const { id } = useParams();
//   const [product, setProduct] = React.useState<Product | null>(null);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);

//   let itemDetails = null;
//   if(id) itemDetails = getProductData(+id);


// //   React.useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const data = await getProductData(id || '');
// //         setProduct(data);
// //       } catch (err) {
// //         setError('Failed to load product details.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) {
// //       fetchProduct();
// //     }
// //   }, [id]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
//   }

//   if (!product) {
//     return <div className="flex justify-center items-center h-screen">Product not found</div>;
//   }

//   if(itemDetails)
//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <img src={itemDetails.images[0]} alt={product.name} className="w-full h-auto object-contain" />
//           <div className="mt-4">
//             {product.images.map((image, index) => (
//               <img key={index} src={image} alt={product.name} className="w-24 h-24 object-contain mr-2" />
//             ))}
//           </div>
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//           <p className="text-lg mb-4">{product.description}</p>
//           <p className="text-2xl font-bold mb-4">Price: ${product.price.toFixed(2)}</p>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ProductDetails;