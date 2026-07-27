const { pgTable, serial, varchar, integer } = require("drizzle-orm/pg-core");

const mahasiswaTable = pgTable("mahasiswa", {
    id: serial("id").primaryKey(),
    nim: varchar("nim", { length: 20 }).notNull().unique(),
    nama: varchar("nama", { length: 255 }).notNull(),
    jurusan: varchar("jurusan", { length: 255 }).notNull(),
    umur: integer("umur").notNull(),
});

module.exports = { mahasiswaTable };