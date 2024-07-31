"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fingerprint_1 = __importDefault(require("express-fingerprint"));
const router_1 = require("./src/router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, express_fingerprint_1.default)({
    parameters: [express_fingerprint_1.default.useragent, express_fingerprint_1.default.acceptHeaders],
}));
app.use("/api/v1/auth", router_1.authRouter);
app.use("/api/v1/words", router_1.wordsRouter);
app.use("/api/v1/results", router_1.resultsRouter);
/* abc */
app.use(express_1.default.static(path_1.default.join(__dirname, "./public/index.html")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "./public/index.html", "index.html"));
});
// app.get('/api/v1/resource/protected', TokenService.checkAccess, (_, res) => {
//   return res.status(200).json('Welcome' + Date.now());
// });
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
