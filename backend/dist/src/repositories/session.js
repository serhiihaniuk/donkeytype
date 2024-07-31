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
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const setup_1 = require("../db/setup");
class RefreshSessionsRepository {
    static getRefreshSessions(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield setup_1.db
                .select()
                .from(schema_1.refreshSessions)
                .where((0, drizzle_orm_1.eq)(schema_1.refreshSessions.refreshToken, refreshToken));
            if (!response) {
                return null;
            }
            return response[0];
        });
    }
    static createRefreshSession(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, refreshToken, fingerprint }) {
            yield setup_1.db.insert(schema_1.refreshSessions).values({
                userId: id,
                refreshToken: refreshToken,
                fingerPrint: fingerprint.hash,
            });
        });
    }
    static deleteRefreshSession(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield setup_1.db
                .delete(schema_1.refreshSessions)
                .where((0, drizzle_orm_1.eq)(schema_1.refreshSessions.refreshToken, refreshToken));
        });
    }
}
exports.default = RefreshSessionsRepository;
