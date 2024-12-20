import authHeader from "../auth-header";

describe("authHeader", () => {
    beforeEach(() => {
        // Замокировать localStorage
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn(),
        } as any;
    });

    afterEach(() => {
        // Очистить все моки после каждого теста
        jest.clearAllMocks();
    });

    it("should return Authorization header with token when user exists", () => {
        const user = { accessToken: "mockToken" };
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(user));

        const header = authHeader();

        expect(localStorage.getItem).toHaveBeenCalledWith("user");
        expect(header).toEqual({ Authorization: "Bearer mockToken" });
    });

    it("should return empty Authorization header when user does not exist", () => {
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

        const header = authHeader();

        expect(localStorage.getItem).toHaveBeenCalledWith("user");
        expect(header).toEqual({ Authorization: "" });
    });

    it("should return empty Authorization header when accessToken is missing", () => {
        const user = { otherProperty: "value" }; // Нет accessToken
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(user));

        const header = authHeader();

        expect(localStorage.getItem).toHaveBeenCalledWith("user");
        expect(header).toEqual({ Authorization: "" });
    });
});