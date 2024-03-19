const { serial, text, pgTable } = require("drizzle-orm/pg-core");
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password")
});

module.exports = {
  users: users
};
