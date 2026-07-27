require("dotenv").config();
const express = require("express");
const { eq } = require("drizzle-orm");
const db = require("./db");
const { mahasiswaTable } = require("./schema");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// GET semua mahasiswa
app.get("/mahasiswa", async (req, res) => {
  try {
    const data = await db.select().from(mahasiswaTable);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
});

// GET mahasiswa by nim
app.get("/mahasiswa/:nim", async (req, res) => {
  try {
    const { nim } = req.params;
    
    const dataMahasiswa = await db
      .select()
      .from(mahasiswaTable)
      .where(eq(mahasiswaTable.nim, nim));

    if (dataMahasiswa.length === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.json(dataMahasiswa[0]);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

// POST mahasiswa + validasi
app.post("/mahasiswa", async (req, res) => {
  const { nama, nim, jurusan, umur } = req.body;

  // Validation
  if (!nama || typeof nama !== "string" || nama.trim().length < 3) {
    return res.status(400).json({ message: "Nama tidak boleh kosong dan minimal berisi 3 karakter." });
  }

  if (!nim || typeof nim !== "string" || !/^\d+$/.test(nim)) {
    return res.status(400).json({ message: "NIM harus diisi dan wajib berupa string angka." });
  }

  if (umur === undefined || typeof umur !== "number" || umur < 15) {
    return res.status(400).json({ message: "Umur harus diisi, berupa angka, dan tidak boleh kurang dari 15 tahun." });
  }

try {
    const newMahasiswa = await db.insert(mahasiswaTable).values({
      nama: nama.trim(),
      nim,
      jurusan: jurusan || "Belum ditentukan",
      umur,
    }).returning();

    res.status(201).json({
      message: `Berhasil menambahkan mahasiswa baru bernama ${nama}`,
      data: newMahasiswa[0],
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: "NIM sudah terdaftar di database." });
    }
    console.error("Error Post:", error);
    res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});