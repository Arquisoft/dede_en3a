export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["<rootDir>/e2e/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "jest-puppeteer"
}