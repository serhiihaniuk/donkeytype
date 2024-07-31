"use strict";
//@ts-nocheck
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
const result_1 = __importDefault(require("../repositories/result"));
function getMaxWPM(data, time) {
    const filtered = data.filter(result => result.time === time);
    if (filtered.length === 0) {
        return null;
    }
    const maxWPM = Math.max(...filtered.map(result => result.wpm));
    return maxWPM;
}
class ResultsService {
    static getResultsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allResults = yield result_1.default.getResultsById(userId);
            console.log(allResults);
        });
    }
    static getBestResultsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allResults = yield result_1.default.getResultsById(userId);
            const res = {
                15: getMaxWPM(allResults, 15),
                30: getMaxWPM(allResults, 30),
                60: getMaxWPM(allResults, 60)
            };
            return res;
        });
    }
}
exports.default = ResultsService;
