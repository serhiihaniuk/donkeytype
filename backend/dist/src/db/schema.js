"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsTable = exports.wordsTable = exports.refreshSessions = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull(),
    email: (0, pg_core_1.text)("email").unique().notNull(),
    password: (0, pg_core_1.text)("password").notNull()
});
exports.refreshSessions = (0, pg_core_1.pgTable)("refreshSessions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.id, { onDelete: 'cascade' }),
    refreshToken: (0, pg_core_1.text)("refresh_token").notNull(),
    fingerPrint: (0, pg_core_1.text)("finger_print").notNull()
});
exports.wordsTable = (0, pg_core_1.pgTable)("words", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    words: (0, pg_core_1.text)('words').array().notNull(),
});
exports.resultsTable = (0, pg_core_1.pgTable)("results", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    time: (0, pg_core_1.integer)("time").notNull(),
    wpm: (0, pg_core_1.integer)("wpm").notNull(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.id, { onDelete: 'cascade' }),
});
