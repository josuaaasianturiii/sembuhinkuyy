# 🏥 Sembuhinkuyy Backend REST API

Backend service Express.js + REST API untuk aplikasi pengecekan gejala kesehatan (**Symptom Checker**) "Sembuhinkuyy". Built with Node.js, Express.js (ES Modules), CORS, Dotenv, & PostgreSQL (dengan fallback Memory Store otomatis jika database offline).

---

## 🚀 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4.21+) dengan ES Modules (`import`/`export` syntax)
- **Database**: PostgreSQL (via `pg` Pool) dengan **Memory Fallback Store** otomatis jika PostgreSQL offline
- **Environment**: Dotenv (`.env`)
- **CORS**: Flexible CORS rules untuk mendukung Vite React frontend (`localhost:8443`, `localhost:5173`, dsb.)

---

## 📁 Struktur Proyek (Modular Architecture)

```text
backend/
├── src/
│   ├── config/
│   │   └── database.js       # PostgreSQL Pool connection & health test
│   ├── controllers/
│   │   └── symptomController.js # Logic handler untuk health check, symptoms, & diagnosis
│   ├── models/
│   │   └── symptomModel.js   # Knowledge base medis, pembobotan diagnosis, & DB fallback
│   ├── routes/
│   │   └── symptomRoutes.js  # Definisi endpoint REST API
│   └── server.js             # Entrypoint Express app & error handler
├── .env                      # Variabel lingkungan
├── package.json              # Dependensi & scripts
└── README.md                 # Dokumentasi proyek
```

---

## 📡 REST API Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Deskripsi**: Memeriksa status kesehatan server backend.
- **Respon Success (200 OK)**:
```json
{
  "status": "OK",
  "service": "Sembuhinkuy Backend API",
  "version": "1.0.0",
  "timestamp": "2026-09-20T16:50:00.000Z"
}
```

---

### 2. Get Symptoms & Body Zones
- **Endpoint**: `GET /api/symptoms`
- **Deskripsi**: Mengambil daftar 8 area tubuh (Kepala, Leher, Dada, Perut, Lengan Kiri, Lengan Kanan, Kaki Kiri, Kaki Kanan) beserta daftar gejala klinisnya.
- **Respon Success (200 OK)**:
```json
{
  "success": true,
  "message": "Berhasil mengambil daftar gejala dan area tubuh.",
  "data": [
    {
      "id": "head",
      "label": "Kepala",
      "emoji": "🧠",
      "color": "#0D9488",
      "colorMuted": "#CCFBF1",
      "description": "Kepala & wajah termasuk otak, mata, telinga, hidung, dan mulut.",
      "symptoms": [
        "Pusing / Vertigo",
        "Migrain",
        "Sakit Kepala Tegang",
        "Kepala Berdenyut",
        "Penglihatan Kabur",
        "Telinga Berdenging",
        "Hidung Tersumbat",
        "Sakit Gigi"
      ]
    }
  ]
}
```

---

### 3. Diagnosis Symptoms
- **Endpoint**: `POST /api/diagnosa`
- **Deskripsi**: Menerima daftar gejala terpilih user, memproses algoritma pencocokan medis, menentukan tingkat urgensi (`rendah` / `sedang` / `tinggi`), memberikan langkah perawatan mandiri (*self-care*), dan tanda-tanda peringatan darurat (*warning signs*).
- **Request Body (JSON)**:
```json
{
  "symptoms": [
    {
      "label": "Pusing / Vertigo",
      "zone": "head",
      "severity": "sedang",
      "duration": "1-3 hari"
    },
    {
      "label": "Telinga Berdenging",
      "zone": "head",
      "severity": "sedang",
      "duration": "1-3 hari"
    }
  ]
}
```
- **Respon Success (200 OK)**:
```json
{
  "success": true,
  "message": "Analisis keluhan berhasil diproses.",
  "data": {
    "totalSymptomsReported": 2,
    "overallUrgency": "sedang",
    "conditions": [
      {
        "id": "head-3",
        "name": "Vertigo (Gangguan Keseimbangan Telinga Dalam)",
        "category": "Otologi & Neurologi",
        "severity": "sedang",
        "matchPct": 92,
        "summary": "Sensasi berputar atau melayang yang dipicu oleh gangguan sistem keseimbangan telinga dalam atau saraf otak.",
        "matchedSymptoms": ["pusing / vertigo", "telinga berdenging"]
      }
    ],
    "selfCareSteps": [
      {
        "title": "Hindari Gerakan Kepala Mendadak",
        "desc": "Duduk sejenak sebelum bangun tidur dan ubah posisi kepala secara perlahan.",
        "icon": "bed",
        "color": "#7C3AED",
        "bg": "#EDE9FE"
      }
    ],
    "warningSigns": [
      "Sakit kepala hebat yang muncul mendadak secara tiba-tiba (seperti petir)",
      "Sakit kepala disertai leher kaku, muntah menyembur, atau gangguan bicara",
      "Penglihatan ganda, lumpuh pada separuh wajah/anggota gerak tubuh",
      "Sensasi berputar (vertigo) hebat yang tidak kunjung mereda >24 jam"
    ],
    "timestamp": "2026-09-20T16:50:00.000Z"
  }
}
```
- **Respon Validation Error (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Daftar gejala tidak boleh kosong. Harap kirimkan payload array symptoms dengan minimal 1 gejala.",
  "data": null
}
```

---

## 💻 Cara Instalasi & Menjalankan Server

### 1. Prasyarat
- Node.js (versi 18 ke atas) dipastikan sudah terinstall.
- pnpm / npm / yarn.

### 2. Instalasi Dependensi
Jalankan perintah berikut di folder `backend`:
```bash
cd backend
npm install
```

### 3. Konfigurasi Environment Variable (`.env`)
Buat file `.env` di folder `backend` (atau gunakan bawaan yang sudah disediakan):
```env
PORT=5000
NODE_ENV=development

# PostgreSQL Configuration (Opsional - Backend akan otomatis menggunakan Memory Fallback jika DB offline)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=sembuhinkuy_db
```

### 4. Menjalankan Server Mode Development (Nodemon Live-Reload)
```bash
npm run dev
```

### 5. Menjalankan Server Mode Produksi
```bash
npm start
```

Server akan aktif pada **http://localhost:5000**.
- Cek status server: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- Cek daftar gejala: [http://localhost:5000/api/symptoms](http://localhost:5000/api/symptoms)
