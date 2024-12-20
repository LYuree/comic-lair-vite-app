import { truncateText } from "../truncateText";

describe("truncateText", () => {
    it("should return the string if it's shorter than 40 characters", () => {
        const str = "This is a short string.";
        const expected = str;
        const actual = truncateText(str);
        expect(actual).toBe(expected);
    });

    it("should truncate the string to 25 characters and add '...' if it's longer than 40 characters", () => {
        const str = "This is a long string that needs to be truncated.";
        const expected = "This is a long string tha...";
        const actual = truncateText(str);
        expect(actual).toBe(expected);
    });

    it("should handle an empty string", () => {
        const str = "";
        const expected = "";
        const actual = truncateText(str);
        expect(actual).toBe(expected);
    });


    it("should handle a string with less than 25 characters", () => {
        const str = "Short string";
        const expected = str;
        const actual = truncateText(str);
        expect(actual).toBe(expected);
    });
});