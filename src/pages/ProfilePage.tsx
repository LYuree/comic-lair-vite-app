import { FC, useLayoutEffect, useState } from "react";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { IOrderJSON } from "../api/products/fetchOrderDetails";
import { observer } from "mobx-react";
import { adminCreateProduct } from "../api/products/adminCreateProduct";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";

const ProfilePage: FC = observer(() => {
  const navigate = useNavigate();

  const {
    profileStore: {
      profileLoading,
      userOrderDetails,
      fetchOrderDetails,
      currentUser,
    },
  } = rootStore;

  // State for product creation form
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productHit, setProductHit] = useState(false);
  const [productReleaseDate, setProductReleaseDate] = useState(new Date());
  const [productBrand, setProductBrand] = useState("");
  const [productDigital, setProductDigital] = useState(false);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [productCoverType, setProductCoverType] = useState<
    "Мягкая обложка" | "Твёрдая обложка" | "-"
  >("-");
  const [productCoverImagePath, setProductCoverImagePath] = useState("");
  const [productAmount, setProductAmount] = useState(1);
  // const [productImages, setProductImages] = useState<ICoverImage[]>([]); // Adjust ICoverImage type as needed
  const [productReviews] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      discount: productDiscount,
      hit: productHit,
      release_date: productReleaseDate,
      brand: productBrand,
      digital: productDigital,
      categories: productCategories,
      cover_type: productCoverType,
      cover_image: productCoverImagePath,
      amount: productAmount,
      // images: productImages,
      reviews: productReviews,
    };

    const success = await adminCreateProduct(productData);
    if (success) {
      alert("Product created successfully!");
      // Optionally reset form fields or redirect
    } else {
      alert("Failed to create product.");
    }
  };

  useLayoutEffect(() => {
    fetchOrderDetails();
  }, []);

  if (profileLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) return <div>Error. User is null or undefined.</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>
        <div className="flex flex-wrap justify-between">
          {/* Regular User Section */}
          <div className="w-full md:w-1/2 p-2">
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-2xl font-semibold mb-4">История заказов</h2>
              <ul>
                {userOrderDetails?.map((order: IOrderJSON) => (
                  <li key={crypto.randomUUID()} className="mb-2">
                    {`Заказ ${order.email} - Id пользователя: ${order.phone}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Admin Section */}
          {currentUser.role === "ADMIN" && (
            <>
              <AdminDashboard />
              <div className="w-full md:w-1/2 p-2">
                <div className="bg-white shadow-md rounded p-4">
                  <h2 className="text-2xl font-semibold mb-4">Администратор</h2>
                  <p>Добро пожаловать, администратор!</p>
                  <form onSubmit={handleSubmit} className="mt-4">
                    {/* Product Name */}
                    <div className="mb-4">
                      <label
                        htmlFor="productName"
                        className="block text-sm font-medium"
                      >
                        Название продукта
                      </label>
                      <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Description */}
                    <div className="mb-4">
                      <label
                        htmlFor="productDescription"
                        className="block text-sm font-medium"
                      >
                        Описание продукта
                      </label>
                      <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Price */}
                    <div className="mb-4">
                      <label
                        htmlFor="productPrice"
                        className="block text-sm font-medium"
                      >
                        Цена продукта
                      </label>
                      <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) =>
                          setProductPrice(Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Discount */}
                    <div className="mb-4">
                      <label
                        htmlFor="productDiscount"
                        className="block text-sm font-medium"
                      >
                        Скидка продукта
                      </label>
                      <input
                        type="number"
                        id="productDiscount"
                        value={productDiscount}
                        step="0.1"
                        max="0.95"
                        onChange={(e) =>
                          setProductDiscount(Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Hit */}
                    <div className="mb-4">
                      <label
                        htmlFor="productHit"
                        className="block text-sm font-medium"
                      >
                        Хит продаж?
                      </label>
                      <input
                        type="checkbox"
                        id="productHit"
                        checked={productHit}
                        onChange={(e) => setProductHit(e.target.checked)}
                        className="mt-1"
                      />
                    </div>

                    {/* Product Release Date */}
                    <div className="mb-4">
                      <label
                        htmlFor="productReleaseDate"
                        className="block text-sm font-medium"
                      >
                        Дата релиза
                      </label>
                      <input
                        type="date"
                        id="productReleaseDate"
                        onChange={(e) =>
                          setProductReleaseDate(new Date(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Brand */}
                    <div className="mb-4">
                      <label
                        htmlFor="productBrand"
                        className="block text-sm font-medium"
                      >
                        Бренд
                      </label>
                      <input
                        type="text"
                        id="productBrand"
                        value={productBrand}
                        onChange={(e) => setProductBrand(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Digital */}
                    <div className="mb-4">
                      <label
                        htmlFor="productDigital"
                        className="block text-sm font-medium"
                      >
                        Цифровой продукт?
                      </label>
                      <input
                        type="checkbox"
                        id="productDigital"
                        checked={productDigital}
                        onChange={(e) => setProductDigital(e.target.checked)}
                        className="mt-1"
                      />
                    </div>

                    {/* Product Categories */}
                    <div className="mb-4">
                      <label
                        htmlFor="productCategories"
                        className="block text-sm font-medium"
                      >
                        Категории (через запятую)
                      </label>
                      <input
                        type="text"
                        id="productCategories"
                        value={productCategories.join(", ")}
                        onChange={(e) =>
                          setProductCategories(
                            e.target.value.split(",").map((cat) => cat.trim())
                          )
                        }
                        placeholder="Категория 1, Категория 2"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Cover */}
                    {/* {show only if digital === false} */}
                    <div className="mb-4">
                      <label
                        htmlFor="productCover"
                        className="block text-sm font-medium"
                      >
                        Обложка
                      </label>
                      <select
                        id="productCover"
                        value={productCoverType || ""}
                        onChange={(e) =>
                          setProductCoverType(
                            e.target.value as
                              | "Мягкая обложка"
                              | "Твёрдая обложка"
                              | "-"
                          )
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      >
                        <option value="-">-</option>
                        <option value="Мягкая обложка">Мягкая обложка</option>
                        <option value="Твёрдая обложка">Твёрдая обложка</option>
                      </select>
                    </div>

                    {/* Product Images */}
                    {/* Add logic for image upload or URL input as needed */}

                    <div className="mb-4">
                      <label
                        htmlFor="productBrand"
                        className="block text-sm font-medium"
                      >
                        Изображение обложки (путь к файлу)
                      </label>
                      <input
                        type="text"
                        id="productCoverImagePath"
                        value={productCoverImagePath}
                        onChange={(e) =>
                          setProductCoverImagePath(e.target.value)
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Product Amount */}
                    <div className="mb-4">
                      <label
                        htmlFor="productAmount"
                        className="block text-sm font-medium"
                      >
                        Количество
                      </label>
                      <input
                        type="number"
                        id="productAmount"
                        min="1"
                        value={productAmount}
                        onChange={(e) =>
                          setProductAmount(Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 text-white p-2 hover:bg-blue-600"
                    >
                      Создать продукт
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Regular User Info */}
          <div className="w-full md:w-1/2 p-2">
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Общая информация о пользователе
              </h2>
              {/* User info can be displayed here */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="w-[50vw] mx-auto bg-blue-500 text-white p-2 hover:bg-blue-600"
          onClick={() => {
            logout();
            navigate("/signin");
          }}
        >
          Выйти
        </button>
      </div>
    </>
  );
});

export default ProfilePage;
