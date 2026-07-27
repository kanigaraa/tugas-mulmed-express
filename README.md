# Tugas KSM Multimedia Web Development: Express.js & Drizzle ORM

REST API sederhana untuk manajemen data mahasiswa menggunakan Express.js, Drizzle ORM, dan PostgreSQL (Supabase).

## Tech Stack
- Node.js & Express.js
- Drizzle ORM & Postgres.js
- PostgreSQL (Supabase Connection Pooler)

## Skema Tabel Mahasiswa

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | serial | Primary Key |
| nim | varchar(20) | Unique, Not Null |
| nama | varchar(255) | Not Null |
| jurusan | varchar(255) | Not Null |
| umur | int | Not Null |

## Endpoint API

- `GET /mahasiswa` - Mengambil seluruh data mahasiswa
- `GET /mahasiswa/:nim` - Mengambil data mahasiswa berdasarkan NIM
- `POST /mahasiswa` - Menambahkan data mahasiswa baru

### Example Payload (POST /mahasiswa)

```json
{
  "nim": "2410512151",
  "nama": "Khaliz Kanigara",
  "jurusan": "S1 Sistem Informasi",
  "umur": 20
}
```

## Cara Menjalankan Project

1. Clone repository dan install dependensi:
   ```bash
   npm install
   ```

2. Buat file `.env` berdasarkan `.env.example` dan atur koneksi database:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname"
   PORT=8080
   ```

3. Jalankan server:
   ```bash
   npm start
   ```
