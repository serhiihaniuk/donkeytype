"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsRouter = exports.wordsRouter = exports.authRouter = void 0;
//@ts-nocheck
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const wordsController_1 = __importDefault(require("../controllers/wordsController"));
const resultsController_1 = __importDefault(require("../controllers/resultsController"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/sign-up', userController_1.default.signUp);
exports.authRouter.post('/sign-in', userController_1.default.signIn);
exports.authRouter.post('/logout', userController_1.default.logOut);
exports.authRouter.post('/refresh', userController_1.default.refresh);
exports.authRouter.get('/checkUsername', userController_1.default.checkUsername);
exports.wordsRouter = (0, express_1.Router)();
exports.wordsRouter.get('/getWords', wordsController_1.default.getWords);
exports.resultsRouter = (0, express_1.Router)();
exports.resultsRouter.post('/save', resultsController_1.default.registerResult);
exports.resultsRouter.get('/getBestResults', resultsController_1.default.getBestResultsByUser);
exports.resultsRouter.get('/getLeaderboard', resultsController_1.default.getBestResults);
