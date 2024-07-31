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
//@ts-nocheck
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = require("../utils/errors");
dotenv_1.default.config();
class TokenService {
    static generateAccessToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30m',
            });
        });
    }
    static generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '30d',
            });
        });
    }
    static checkAccess(req, _, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const authHeader = req.headers.authorization;
            const token = (_a = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')) === null || _a === void 0 ? void 0 : _a[1];
            if (!token) {
                return next(new errors_1.Unauthorized());
            }
            try {
                req.user = yield TokenService.verifyAccessToken(token);
            }
            catch (error) {
                console.log(error);
                return next(new errors_1.Forbidden(error));
            }
            next();
        });
    }
    static verifyAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        });
    }
    static verifyRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        });
    }
}
exports.default = TokenService;
