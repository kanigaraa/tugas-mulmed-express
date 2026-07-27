require("dotenv").config();

/** @type { import("drizzle-kit").Config } */
module.exports = {
    schema: "./schema.js",
    dialect: "postgresql",
    schemaFilter: ["public"],
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};