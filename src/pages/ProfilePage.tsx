import { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { observer } from "mobx-react";
import { adminCreateProduct } from "../api/products/adminCreateProduct";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IoPersonCircleOutline } from "react-icons/io5";

interface Order {
  id: string;
  cartProducts: { data: any[] };
  phone: string;
  email: string;
  // Add other necessary fields
}

const ordersPerPage = 5;

const ProfilePage: FC = observer(() => {
  const navigate = useNavigate();

  const {
    profileStore: {
      profileLoading,
      // userOrderDetails,
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

  const [page, setPage] = useState(1);
  const [loyaltyCardId, setLoyaltyCardId] = useState("");
  const itemsPerPage = 5;

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

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLoyaltySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted loyalty card ID:", loyaltyCardId);
  };

  // Typed mock data
  const paginatedOrders: Order[] = [
    {
      id: "dfsdwoerw654s6d54f6",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "eqw68e7s43c21vx1c2v",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "s2df16er57t953b2",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "er98t796df5s13d2f13",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "d645f4g98vb64g32hf",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "pio78p9i5432j3g5h4j6",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
    {
      id: "h6j54k6h5j4kj98kl79j",
      cartProducts: { data: [] },
      phone: "+7 (999) 123-45-67",
      email: "ivan.ivanov@example.com",
    },
  ];

  if (profileLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) return <div>Error. User is null or undefined.</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>
        <div className="flex flex-wrap justify-between">
          {/* Admin Section */}
          {currentUser.role === "ADMIN" && (
            <>
              <AdminDashboard />
              <div className="w-full md:w-1/2 p-2">
                {/* <div className="w-full p-2"> */}
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
                      className="mt-4 bg-[#bd0000] text-white p-2 hover:bg-[#840000]"
                    >
                      Создать продукт
                    </button>
                  </form>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "50%",
                      borderRadius: 0,
                      position: "relative",
                      transform: "translateX(-50%)",
                      left: "50%",
                      marginTop: "2rem",
                    },
                  }}
                  onClick={() => navigate("/signin")}
                >
                  Выйти
                </Button>
              </div>
            </>
          )}
          {currentUser.role === "USER" && (
            // <div className="w-full md:w-1/2 p-2">
            <div className="w-full p-2">
              <div className="bg-white shadow-md rounded p-4">
                {/* User info can be displayed here */}

                <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 3,
                    }}
                  >
                    {/* User Info Section */}
                    <Box sx={{ flex: 1 }}>
                      <Card elevation={3} sx={{ mb: 3 }}>
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              mb: 3,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 120,
                                height: 120,
                                mb: 2,
                                bgcolor: "primary.main",
                              }}
                            >
                              <IoPersonCircleOutline />
                            </Avatar>
                            <Typography variant="h6">Иван Иванов</Typography>
                            <Typography color="text.secondary">
                              ivan.ivanov@example.com
                            </Typography>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                              Контактная информация
                            </Typography>
                            <Typography>
                              <strong>Телефон:</strong> +7 (999) 123-45-67
                            </Typography>
                            <Typography>
                              <strong>Адрес:</strong> г. Москва, ул. Примерная,
                              д. 1
                            </Typography>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                              Программа лояльности
                            </Typography>
                            <Box
                              sx={{
                                width: "100%",
                                height: 20,
                                backgroundColor: "#e0e0e0",
                                borderRadius: 10,
                                mb: 2,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "65%",
                                  height: "100%",
                                  backgroundColor: "primary.main",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                  pr: 1,
                                }}
                              >
                                <Typography variant="caption" color="white">
                                  65%
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              Ваша текущая скидка: <strong>5%</strong>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              До следующего уровня: <strong>1,500 ₽</strong>
                            </Typography>

                            <form onSubmit={handleLoyaltySubmit}>
                              <div className="TextField-without-border-radius">
                                <TextField
                                  className="TextField-without-border-radius"
                                  fullWidth
                                  label="Номер карты лояльности"
                                  variant="outlined"
                                  size="small"
                                  value={loyaltyCardId}
                                  onChange={(e) =>
                                    setLoyaltyCardId(e.target.value)
                                  }
                                  sx={{ mb: 2, borderRadius: 0 }}
                                />
                              </div>
                              <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{
                                  borderRadius: 0,
                                  border: 2,
                                  borderColor: "primary.main",
                                  color: "black",
                                }}
                              >
                                Привязать карту
                              </Button>
                            </form>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>

                    {/* Order History Section */}
                    <Box sx={{ flex: 2 }}>
                      <Card elevation={3} sx={{ borderRadius: 0 }}>
                        <CardContent>
                          <Typography variant="h5" component="h2" gutterBottom>
                            История заказов
                          </Typography>

                          {paginatedOrders.length > 0 ? (
                            <>
                              <Box component="ul" sx={{ p: 0, mb: 3 }}>
                                {paginatedOrders
                                  .slice(
                                    (page - 1) * ordersPerPage,
                                    page * ordersPerPage
                                  )
                                  .map((order: Order) => (
                                    <Paper
                                      key={order.id}
                                      component="li"
                                      elevation={2}
                                      sx={{
                                        p: 2,
                                        mb: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderRadius: 0,
                                      }}
                                    >
                                      <Box>
                                        <Typography variant="subtitle1">
                                          Заказ #{order.id.substring(0, 8)}...
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {order.email}
                                        </Typography>
                                      </Box>
                                      <Typography variant="body2">
                                        {order.phone}
                                      </Typography>
                                    </Paper>
                                  ))}
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  mt: 3,
                                }}
                              >
                                <Pagination
                                  count={Math.ceil(
                                    paginatedOrders.length / itemsPerPage
                                  )}
                                  page={page}
                                  onChange={handlePageChange}
                                  color="primary"
                                />
                              </Box>
                            </>
                          ) : (
                            <Typography variant="body1" color="text.secondary">
                              У вас пока нет заказов
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ width: { xs: "100%", sm: "50%", borderRadius: 0 } }}
                      onClick={() => navigate("/signin")}
                    >
                      Выйти
                    </Button>
                  </Box>
                </Box>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default ProfilePage;
