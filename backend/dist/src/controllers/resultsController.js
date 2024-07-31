"use strict";
// @ts-nocheck
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
const resultsService_1 = __importDefault(require("../services/resultsService"));
class restulsController {
    static registerResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, time, wpm } = req.body;
            try {
                yield result_1.default.registerResult({ userId, time, wpm });
                return res.status(201).json('Result saved');
            }
            catch (err) {
                return ErrorsUtils.catchError(res, err);
            }
        });
    }
    static getBestResultsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query;
            try {
                const data = yield resultsService_1.default.getBestResultsByUser(userId);
                return res.status(200).json(data);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static getBestResultsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.query;
            try {
                const data = yield resultsService_1.default.getBestResultsByUser(userId);
                return res.status(200).json(data);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static getBestResults(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { time } = req.query;
            try {
                const data = yield result_1.default.getBestResults({ time });
                return res.status(200).json(data);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = restulsController;
