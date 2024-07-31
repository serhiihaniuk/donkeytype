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
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const setup_1 = require("../db/setup");
class WordsRepository {
    static getWordsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield setup_1.db.select().from(schema_1.wordsTable).where((0, drizzle_orm_1.eq)(schema_1.wordsTable.name, name));
            if (!response.length) {
                return null;
            }
            return response[0];
        });
    }
}
exports.default = WordsRepository;
