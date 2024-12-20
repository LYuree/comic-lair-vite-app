import { fetchProducts } from "../fetchProducts";
import axios from "axios";

describe("fetchProducts", () => {
    it("should fetch products successfully", async () => {
        const mockResponse = {
            data: {
                data: [
                    {
                        id: 1,
                        name: "Test Product 1",
                        description: "Test description",
                        price: 10,
                        discount: 0,
                        hit: true,
                        releaseDate: "2023-10-26",
                        brand: "Test Brand",
                        digital: false,
                        categories: ["Книга"],
                        cover: "Мягкая обложка",
                        amount: 100,
                        images: [{ image: "image1.jpg" }],
                        reviews: null
                    },
                ],
            },
        };
        const mockedAxiosGet = jest.fn().mockResolvedValue({ data: mockResponse.data });
        axios.get = mockedAxiosGet;

        const result = await fetchProducts();

        expect(mockedAxiosGet).toHaveBeenCalledWith("http://127.0.0.1:8000/products/");
        expect(result.data).toBeDefined();

        axios.get = jest.fn().mockResolvedValue({ data: mockResponse.data });
    });


    it("should handle errors gracefully", async () => {
        const mockError = new Error("Network error");
        const mockedAxiosGet = jest.fn().mockRejectedValue(mockError);
        axios.get = mockedAxiosGet;


        const result = await fetchProducts();

        expect(mockedAxiosGet).toHaveBeenCalledWith("http://127.0.0.1:8000/products/");
        expect(result.data).toEqual([]); //Correct assertion for empty data
        axios.get = jest.fn(); //Restore the original function
    });
});
