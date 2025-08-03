import { IoSearch } from "react-icons/io5";
import { IProductItem } from "../api/products/fetchProducts";
import Container from "../components/Container";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TbArrowsSort } from "react-icons/tb";
import { observer } from "mobx-react";
import { rootStore } from "../store";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  SelectChangeEvent,
  TextField,
  Box,
  Grid,
  Typography,
  Button,
  Slider,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GridProductCard from "../components/GridProductCard/GridProductCard";
import formatPrice from "../utils/formatPrice";

const ProductsPage = observer(() => {
  const {
    productsStore: {
      products,
      fetchProducts,
      productsLoading,
      sortingMethod,
      setSortingMethod,
      displayedProducts,
      setDisplayedProducts,
    },
    gridPageStore: {
      currentPage,
      itemsPerPage,
      setItemsPerPage,
      setCurrentPage,
      categoryCheckboxes,
      setCategoryCheckboxes,
      searchFormValue,
      setSearchFormValue,
      coverCheckboxes,
      setCoverCheckboxes,
      brandCheckboxes,
      setBrandCheckboxes,
      minPrice,
      maxPrice,
      setMaxPrice,
      setMinPrice,
      setPriceRange,
    },
  } = rootStore;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const numberOfPages = Math.ceil(displayedProducts.data.length / itemsPerPage);
  const itemCategories = products.data.map((item) => item.categories).flat();
  const uniqueCategories = [...new Set(itemCategories)];
  const uniqueCategoryCheckboxes = uniqueCategories.map((category) => {
    return {
      id: crypto.randomUUID(),
      categoryName: category,
      checked: false,
    };
  });

  const coverTypes = ["Твёрдая обложка", "Мягкая обложка"];
  const uniqueCoverCheckboxes = coverTypes.map((coverType) => {
    return {
      id: crypto.randomUUID(),
      coverType: coverType,
      checked: false,
    };
  });

  const itemBrands = products.data.map((item) => item.brand);
  const uniqueBrands = [...new Set(itemBrands)];
  const uniqueBrandCheckboxes = uniqueBrands.map((brand) => {
    return {
      id: crypto.randomUUID(),
      brandName: brand,
      checked: false,
    };
  });

  const pricesAvailable = products.data.map(
    (item) => item.price * (1.0 - item.discount)
  );
  const maxAvailablePrice = Math.max(...pricesAvailable);
  const minAvailablePrice = Math.min(...pricesAvailable);

  useEffect(() => {
    setCategoryCheckboxes(uniqueCategoryCheckboxes);
    setCoverCheckboxes(uniqueCoverCheckboxes);
    setBrandCheckboxes(uniqueBrandCheckboxes);
    setMaxPrice(maxAvailablePrice);
    setMinPrice(minAvailablePrice);
  }, [products]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const clearFilters = function () {
    const newCategoryCheckboxes = categoryCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    const newCoverCheckboxes = coverCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    const newBrandCheckboxes = brandCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: false,
    }));
    setCategoryCheckboxes(newCategoryCheckboxes);
    setCoverCheckboxes(newCoverCheckboxes);
    setBrandCheckboxes(newBrandCheckboxes);
    setPriceRange(minAvailablePrice, maxAvailablePrice);
    setDisplayedProducts(products);
  };

  const applyFilters = function () {
    const newDisplayedProducts = JSON.parse(JSON.stringify(products));

    // Filter by categories
    const selectedCategories = categoryCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.categoryName);
    if (selectedCategories.length > 0) {
      newDisplayedProducts.data = newDisplayedProducts.data.filter(
        (product: IProductItem) =>
          product.categories.some((category) =>
            selectedCategories.includes(category)
          )
      );
    }

    // Filter by cover types
    const selectedCovers = coverCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.coverType);
    if (selectedCovers.length > 0) {
      newDisplayedProducts.data = newDisplayedProducts.data.filter(
        (product: IProductItem) => selectedCovers.includes(product.cover_type)
      );
    }

    // Filter by brands
    const selectedBrands = brandCheckboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.brandName);
    if (selectedBrands.length > 0) {
      newDisplayedProducts.data = newDisplayedProducts.data.filter(
        (product: IProductItem) => selectedBrands.includes(product.brand)
      );
    }

    // Filter by price range
    newDisplayedProducts.data = newDisplayedProducts.data.filter(
      (product: IProductItem) =>
        product.price * (1 - product.discount) >= minPrice &&
        product.price * (1 - product.discount) <= maxPrice
    );

    setDisplayedProducts(newDisplayedProducts);
  };

  const handleSearch = function (inputText: string) {
    setSearchFormValue(inputText);
    const newDisplayedProducts = JSON.parse(JSON.stringify(products));
    if (inputText !== null && inputText !== undefined) {
      newDisplayedProducts.data = newDisplayedProducts.data.filter(
        (product: IProductItem) => {
          return (
            product.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1
          );
        }
      );
      setDisplayedProducts(newDisplayedProducts);
    }
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    const newCategoryCheckboxes = categoryCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: selected.includes(checkbox.categoryName),
    }));
    setCategoryCheckboxes(newCategoryCheckboxes);
  };

  const handleCoverChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    const newCoverCheckboxes = coverCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: selected.includes(checkbox.coverType),
    }));
    setCoverCheckboxes(newCoverCheckboxes);
  };

  const handleBrandChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    const newBrandCheckboxes = brandCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: selected.includes(checkbox.brandName),
    }));
    setBrandCheckboxes(newBrandCheckboxes);
  };

  const selectedCategories = categoryCheckboxes
    .filter((c) => c.checked)
    .map((c) => c.categoryName);
  const selectedCovers = coverCheckboxes
    .filter((c) => c.checked)
    .map((c) => c.coverType);
  const selectedBrands = brandCheckboxes
    .filter((c) => c.checked)
    .map((c) => c.brandName);

  return (
    <>
      {productsLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container>
            <Box sx={{ my: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Поиск..."
                value={searchFormValue}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  endAdornment: <IoSearch />,
                }}
              />
            </Box>

            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ mb: "1rem" }}>
                Найдено {displayedProducts.data.length} результатов
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: "2rem" }}>
                <Button variant="contained" onClick={applyFilters}>
                  Применить
                </Button>
                <Button variant="outlined" onClick={clearFilters}>
                  Очистить
                </Button>
              </Box>
              {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}> */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Кол-во</InputLabel>
                  <Select
                    value={itemsPerPage.toString()}
                    onChange={(e) => {
                      setItemsPerPage(+e.target.value);
                      setCurrentPage(1);
                    }}
                    label="Кол-во"
                    startAdornment={
                      <TfiLayoutGrid3 style={{ marginRight: 8 }} />
                    }
                  >
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="24">24</MenuItem>
                    <MenuItem value="36">36</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Сортировка</InputLabel>
                  <Select
                    value={sortingMethod}
                    onChange={(e) => {
                      setSortingMethod(e.target.value);
                      setCurrentPage(1);
                    }}
                    label="Сортировка"
                    startAdornment={<TbArrowsSort style={{ marginRight: 8 }} />}
                  >
                    <MenuItem value="popular_first">По популярности</MenuItem>
                    <MenuItem value="cheapest_first">От самых дешёвых</MenuItem>
                    <MenuItem value="expensive_first">
                      От самых дорогих
                    </MenuItem>
                    <MenuItem value="A_Z">По алфавиту А-Я</MenuItem>
                    <MenuItem value="Z_A">По алфавиту Я-А</MenuItem>
                    <MenuItem value="newest_first">От самых новых</MenuItem>
                    <MenuItem value="oldest_first">От самых старых</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Grid container spacing={4}>
              {isSmallScreen && (
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <FormControl fullWidth size="small">
                      <InputLabel id="categories-label">Категории</InputLabel>
                      <Select
                        multiple
                        label="Категории"
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {categoryCheckboxes.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id="cover-label">Обложка</InputLabel>
                      <Select
                        labelId="cover-label"
                        label="Обложка"
                        multiple
                        value={selectedCovers}
                        onChange={handleCoverChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {coverCheckboxes.map((cover) => (
                          <MenuItem key={cover.id} value={cover.coverType}>
                            {cover.coverType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id="brand-label">Бренд</InputLabel>
                      <Select
                        labelId="brand-label"
                        label="Бренд"
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {brandCheckboxes.map((brand) => (
                          <MenuItem key={brand.id} value={brand.brandName}>
                            {brand.brandName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box>
                      <Typography gutterBottom>
                        Цена: от {formatPrice(minPrice)} до{" "}
                        {formatPrice(maxPrice)}
                      </Typography>
                      <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(_, newValue) => {
                          setPriceRange(
                            (newValue as number[])[0],
                            (newValue as number[])[1]
                          );
                        }}
                        valueLabelDisplay="auto"
                        min={minAvailablePrice}
                        max={maxAvailablePrice}
                      />
                    </Box>
                  </Box>
                </Grid>
              )}

              {!isSmallScreen && (
                <Grid size={{ md: 3 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    <FormControl fullWidth size="small">
                      <InputLabel id="categories-label">Категории</InputLabel>
                      <Select
                        labelId="categories-label"
                        label="Категории"
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {categoryCheckboxes.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel id="cover-label">Обложка</InputLabel>
                      <Select
                        labelId="cover-label"
                        label="Обложка"
                        multiple
                        value={selectedCovers}
                        onChange={handleCoverChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {coverCheckboxes.map((cover) => (
                          <MenuItem key={cover.id} value={cover.coverType}>
                            {cover.coverType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id="brand-label">Бренд</InputLabel>
                      <Select
                        labelId="brand-label"
                        label="Бренд"
                        multiple
                        value={selectedBrands}
                        onChange={handleBrandChange}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {brandCheckboxes.map((brand) => (
                          <MenuItem key={brand.id} value={brand.brandName}>
                            {brand.brandName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box>
                      <Typography gutterBottom>
                        Цена: от {minPrice} до {maxPrice}
                      </Typography>
                      <Slider
                        value={[minPrice, maxPrice]}
                        onChange={(_, newValue) => {
                          setPriceRange(
                            (newValue as number[])[0],
                            (newValue as number[])[1]
                          );
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxAvailablePrice}
                      />
                    </Box>
                  </Box>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: isSmallScreen ? 12 : 9 }}>
                <Grid container spacing={3}>
                  {displayedProducts.data
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((product: IProductItem) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <GridProductCard key={product.id} data={product} />
                      </Grid>
                    ))}
                </Grid>

                {numberOfPages > 1 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <Pagination
                      count={numberOfPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
});

export default ProductsPage;
