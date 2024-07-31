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
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const setup_1 = require("../db/setup");
class ResultRepository {
    static registerResult(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, time, wpm }) {
            return setup_1.db
                .insert(schema_1.resultsTable)
                .values({ userId: userId, time: time, wpm: wpm });
        });
    }
    static getResultsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return setup_1.db
                .select()
                .from(schema_1.resultsTable)
                .where((0, drizzle_orm_1.eq)(schema_1.resultsTable.userId, userId));
        });
    }
    static getResultsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return setup_1.db
                .select()
                .from(schema_1.resultsTable)
                .where((0, drizzle_orm_1.eq)(schema_1.resultsTable.userId, userId));
        });
    }
    static getBestResults(_a) {
        return __awaiter(this, arguments, void 0, function* ({ time }) {
            return setup_1.db
                .select({
                username: schema_1.usersTable.username,
                wpm: (0, drizzle_orm_1.max)(schema_1.resultsTable.wpm),
            })
                .from(schema_1.resultsTable)
                .where((0, drizzle_orm_1.eq)(schema_1.resultsTable.time, time))
                .innerJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.resultsTable.userId, schema_1.usersTable.id))
                .groupBy(schema_1.usersTable.username)
                .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.max)(schema_1.resultsTable.wpm)));
        });
    }
}
exports.default = ResultRepository;
