# 🚀 Lead Management API

A production-oriented backend service for managing leads with scoring, authentication, filtering, pagination, analytics, and CSV bulk import.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔁 Lead CRUD | Create, read, update, delete leads |
| 🧮 Lead Scoring Engine | Auto-score leads based on attributes |
| 📥 CSV Bulk Import | Upload and import leads via CSV |
| 🔍 Filtering & Pagination | Query leads with rich filter support |
| 🔐 API Key Authentication | Secure all endpoints with an API key |
| 🧪 Unit Testing | Jest-based test suite |
| 📄 Swagger Docs | Interactive API documentation |
| 🐳 Docker Support | Containerized deployment |
| 🗄️ PostgreSQL + Prisma | Relational DB with type-safe ORM |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **File Upload:** Multer
- **Testing:** Jest
- **Docs:** Swagger / OpenAPI 3.0
- **Containerization:** Docker

---

## 📁 Project Structure

```
src/
├── config/           # Environment & app configuration
├── controllers/      # Route handler functions
├── middleware/       # Auth, error handling middleware
├── repositories/     # Database access layer
├── routes/           # Express route definitions
├── services/         # Business logic layer
├── tests/            # Unit and integration tests
├── utils/            # Helper functions
└── validators/       # Zod schema validators
```

---

## ⚙️ Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd lead-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_database_url
API_KEY=dectify-secret-key
```

### 4. Run Database Migration

```bash
npx prisma migrate dev
```

### 5. Start Development Server

```bash
npm run dev
```

---

## 🔐 Authentication

All endpoints require the following header:

```
X-API-Key: dectify-secret-key
```

---

## 📡 API Endpoints

### Leads

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/leads` | Create a new lead |
| `GET` | `/api/leads` | Get all leads (with filters) |
| `GET` | `/api/leads/:id` | Get a lead by ID |
| `PATCH` | `/api/leads/:id` | Update a lead |
| `DELETE` | `/api/leads/:id` | Delete a lead |

### Import

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/import` | Bulk import leads via CSV (`multipart/form-data`) |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads/stats` | Get lead statistics and analytics |

---

## 🔍 Filtering & Pagination

The `GET /api/leads` endpoint supports the following query parameters:

| Parameter | Type | Description | Example |
|---|---|---|---|
| `page` | integer | Page number | `1` |
| `limit` | integer | Results per page | `10` |
| `source` | string | Filter by lead source | `Referral` |
| `status` | string | Filter by lead status | `new` |
| `minScore` | integer | Minimum lead score | `50` |
| `maxScore` | integer | Maximum lead score | `90` |
| `sort` | string | Sort by score (`asc` / `desc`) | `desc` |
| `startDate` | date | Inquiry date range start | `2026-04-01` |
| `endDate` | date | Inquiry date range end | `2026-05-01` |
| `location` | string | Filter by location | `Delhi` |
| `propertyType` | string | Filter by property type | `2BHK` |

**Example Request:**

```
GET /api/leads?page=1&limit=10&source=Referral&minScore=50&sort=desc
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📄 Swagger Documentation

Interactive API docs available at:

```
http://localhost:5000/api-docs
```

> Click the 🔒 **Authorize** button and enter `dectify-secret-key` to authenticate.

---

## 🐳 Docker

**Build the image:**

```bash
docker build -t lead-management-api .
```

**Run the container:**

```bash
docker run -p 5001:5000 lead-management-api
```

---

## 🔮 Future Improvements

- [ ] JWT Authentication
- [ ] Redis Caching
- [ ] Background Job Processing
- [ ] Advanced Analytics Dashboard
- [ ] Role-Based Access Control
- [ ] CI/CD Pipeline