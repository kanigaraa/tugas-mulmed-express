const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

const mahasiswa = [
  {
    nim: "2410512151",
    nama: "Khaliz Kanigara",
    jurusan: "S1 Sistem Informasi",
  },
  {
    nim: "2410512154",
    nama: "Adla Fayyaz",
    jurusan: "S1 Sistem Informasi",
  },
  {
    nim: "2410512142",
    nama: "Luthfi Cardiana",
    jurusan: "S1 Sistem Informasi",
  },
];

// GET mahasiswa
app.get("/mahasiswa", (req, res) => {
  res.json(mahasiswa);
});

// GET mahasiswa by nim
app.get("/mahasiswa/:nim", (req, res) => {
  const { nim } = req.params;

  const dataMahasiswa = mahasiswa.find((mhs) => mhs.nim === nim);

  if (!dataMahasiswa) {
    return res.status(404).json({
      message: "Mahasiswa tidak ditemukan",
    });
  }

  res.json(dataMahasiswa);
});

// POST mahasiswa
app.post("/mahasiswa", (req, res) => {
  const { nama, nim } = req.body;

  res.json({
    message: `Berhasil menambahkan mahasiswa baru bernama ${nama}`,
    data: {
      nama,
      nim,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});