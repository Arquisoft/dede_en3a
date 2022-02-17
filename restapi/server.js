"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
const api_1 = __importDefault(require("./api"));
const app = (0, express_1.default)();
const port = 5000;
const options = {
    origin: ['http://localhost:3000']
};
const metricsMiddleware = (0, express_prom_bundle_1.default)({ includeMethod: true });
app.use(metricsMiddleware);
app.use((0, cors_1.default)(options));
app.use(body_parser_1.default.json());
app.use("/api", api_1.default);
app.listen(port, () => {
    console.log('Restapi listening on ' + port);
}).on("error", (error) => {
    console.error('Error occured: ' + error.message);
});
