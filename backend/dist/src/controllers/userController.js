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
// @ts-nocheck
const user_1 = __importDefault(require("../repositories/user"));
const userService_1 = __importDefault(require("../services/userService"));
const errors_1 = __importDefault(require("../utils/errors"));
class UserController {
    static checkUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.query;
            const userData = yield user_1.default.getUserByUsername(username);
            if (userData) {
                return res.status(409).json(true);
            }
            return res.status(200).json(false);
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { fingerprint } = req;
            try {
                const { username, accessToken, refreshToken, accessTokenExpiration } = yield userService_1.default.signIn({ email, password, fingerprint });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 6048e5,
                    sameSite: 'None',
                    secure: true
                });
                return res
                    .status(201)
                    .json({ username, accessToken, accessTokenExpiration });
            }
            catch (err) {
                return errors_1.default.catchError(res, err);
            }
        });
    }
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const { fingerprint } = req;
            const userData = yield user_1.default.getUserByEmail(email);
            if (userData) {
                return res.status(409).json({ message: 'Email is not avaliable' });
            }
            try {
                const { accessToken, refreshToken, accessTokenExpiration } = yield userService_1.default.signUp({ username, email, password, fingerprint });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 6048e5,
                    sameSite: 'None',
                    secure: true
                });
                return res.status(201).json({ accessToken, accessTokenExpiration });
            }
            catch (err) {
                return errors_1.default.catchError(res, err);
            }
        });
    }
    static logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            try {
                yield userService_1.default.logOut(refreshToken);
                res.clearCookie();
                return res.sendStatus(200);
            }
            catch (err) {
                return errors_1.default.catchError(res, err);
            }
        });
    }
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { fingerprint } = req;
            const currentRefreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
            try {
                const { accessToken, refreshToken, accessTokenExpiration } = yield userService_1.default.refresh({
                    currentRefreshToken,
                    fingerprint,
                });
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 6048e5,
                    sameSite: 'None',
                    secure: true
                });
                return res.status(200).json({ accessToken, accessTokenExpiration });
            }
            catch (err) {
                return errors_1.default.catchError(res, err);
            }
        });
    }
}
exports.default = UserController;
