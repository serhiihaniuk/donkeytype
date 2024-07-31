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
//@ts-nocheck
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const setup_1 = require("../db/setup");
class UserRepository {
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield setup_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.username, username));
            if (!response.length) {
                return null;
            }
            return response[0];
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield setup_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
            if (!response.length) {
                return null;
            }
            return response[0];
        });
    }
    static createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, hashedPassword }) {
            return setup_1.db
                .insert(schema_1.usersTable)
                .values({ username: username, email: email, password: hashedPassword })
                .returning({ insertedId: schema_1.usersTable.id });
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return setup_1.db.select().from(schema_1.usersTable);
        });
    }
}
exports.default = UserRepository;
