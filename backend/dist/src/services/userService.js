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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../repositories/user"));
const tokenService_1 = __importDefault(require("./tokenService"));
const session_1 = __importDefault(require("../repositories/session"));
const errors_1 = require("../utils/errors");
class userService {
    static signUp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password, fingerprint }) {
            const hashedPassword = bcrypt_1.default.hashSync(password, 8);
            const [{ insertedId }] = yield user_1.default.createUser({
                username,
                email,
                hashedPassword
            });
            const payload = { insertedId, username, email };
            const accessToken = yield tokenService_1.default.generateAccessToken(payload);
            const refreshToken = yield tokenService_1.default.generateRefreshToken(payload);
            yield session_1.default.createRefreshSession({
                id: insertedId,
                refreshToken,
                fingerprint
            });
            return {
                accessToken,
                refreshToken,
                accessTokenExpiration: 18e5
            };
        });
    }
    static signIn(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, fingerprint }) {
            const userData = yield user_1.default.getUserByEmail(email);
            if (!userData) {
                throw new errors_1.Unauthorized("Wrong email or password");
            }
            const isPasswordValid = bcrypt_1.default.compareSync(password, userData.password);
            if (!isPasswordValid) {
                throw new errors_1.Unauthorized("Wrong email or password");
            }
            const payload = { id: userData.id, email };
            const accessToken = yield tokenService_1.default.generateAccessToken(payload);
            const refreshToken = yield tokenService_1.default.generateRefreshToken(payload);
            yield session_1.default.createRefreshSession({
                id: userData.id,
                refreshToken,
                fingerprint
            });
            return {
                username: userData.username,
                accessToken,
                refreshToken,
                accessTokenExpiration: 18e5
            };
        });
    }
    static logOut(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield session_1.default.deleteRefreshSession(refreshToken);
        });
    }
    static refresh(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fingerprint, currentRefreshToken }) {
            if (!currentRefreshToken) {
                throw new errors_1.Unauthorized();
            }
            const refreshSession = yield session_1.default.getRefreshSessions(currentRefreshToken);
            if (!refreshSession) {
                throw new errors_1.Unauthorized();
            }
            if (refreshSession.fingerPrint !== fingerprint.hash) {
                throw new errors_1.Forbidden();
            }
            yield session_1.default.deleteRefreshSession(currentRefreshToken);
            let payload;
            try {
                payload = yield tokenService_1.default.verifyRefreshToken(currentRefreshToken);
            }
            catch (error) {
                throw new errors_1.Forbidden(error);
            }
            const { id, username, email } = yield user_1.default.getUserByEmail(payload.email);
            const actualPayload = { id, username, email };
            const accessToken = yield tokenService_1.default.generateAccessToken(actualPayload);
            const refreshToken = yield tokenService_1.default.generateRefreshToken(actualPayload);
            yield session_1.default.createRefreshSession({
                id,
                refreshToken,
                fingerprint
            });
            return {
                accessToken,
                refreshToken,
                accessTokenExpiration: 18e5
            };
        });
    }
}
exports.default = userService;
