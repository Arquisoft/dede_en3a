"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
let app;
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = (0, express_1.default)();
    const port = 5000;
    const options = {
        origin: ['http://localhost:3000']
    };
    app.use((0, cors_1.default)(options));
    app.use(body_parser_1.default.json());
    app.use("/api", api_1.default);
    server = app.listen(port, () => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error) => {
        console.error('Error occured: ' + error.message);
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server.close(); //close the server
}));
describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    }));
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        let username = 'Pablo';
        let email = 'gonzalezgpablo@uniovi.es';
        const response = yield (0, supertest_1.default)(app).post('/api/users/add').send({ name: username, email: email }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    }));
});
