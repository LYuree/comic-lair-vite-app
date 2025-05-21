import { FC, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rootStore } from "../store";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { observer } from "mobx-react";
import {
  Avatar,
  Button,
  Pagination,
  TextField,
  Typography,
  Divider,
  Card,
  CardContent,
  Box,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

// Define a proper interface for your order data
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
  const [page, setPage] = useState(1);
  const [loyaltyCardId, setLoyaltyCardId] = useState("");
  const itemsPerPage = 5;

  const {
    profileStore: { profileLoading, fetchOrderDetails },
  } = rootStore;

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

  return (
    <>
      {profileLoading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Личный кабинет
          </Typography>

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
                      <PersonIcon sx={{ fontSize: 60 }} />
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
                      <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1
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
                          onChange={(e) => setLoyaltyCardId(e.target.value)}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
      )}
    </>
  );
});

export default ProfilePage;
