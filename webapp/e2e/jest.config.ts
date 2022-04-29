export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["<rootDir>/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "jest-puppeteer",
    watchman: false
}