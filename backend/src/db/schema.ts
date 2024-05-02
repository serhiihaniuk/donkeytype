import { serial, text, pgTable, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull()
});

export const refreshSessions = pgTable("refreshSessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  refreshToken: text("refresh_token").notNull(),
  fingerPrint: text("finger_print").notNull()
})

export const wordsTable = pgTable("words", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  words: text('words').array().notNull(),
})


