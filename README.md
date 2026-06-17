# 🚀 Lead Management API

A production-oriented backend service for managing leads with lead scoring, authentication, filtering, pagination, analytics, and CSV bulk import.

Built as part of the DECTIFY Backend Intern Technical Assessment.

---

# ✨ Features

| Feature                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| 🔁 Lead CRUD              | Create, Read, Update and Delete Leads          |
| 🧮 Lead Scoring Engine    | Automatic lead scoring based on business rules |
| 📥 CSV Bulk Import        | Import leads from CSV files                    |
| 🔍 Filtering              | Filter by source, score range and date range   |
| 📄 Pagination             | Paginated lead listing                         |
| ↕️ Sorting                | Ascending and descending sorting               |
| 🔐 API Key Authentication | Protect endpoints using X-API-Key              |
| ⚡ Rate Limiting           | Prevent API abuse                              |
| 📊 Analytics              | Lead statistics endpoint                       |
| 🧪 Unit Testing           | Jest-based testing                             |
| 📄 Swagger Documentation  | Interactive API documentation                  |
| 🐳 Docker Support         | Containerized deployment                       |
| 🔄 GitHub Actions CI      | Automated build and test pipeline              |
| 🗄️ PostgreSQL + Prisma   | Relational database with ORM                   |

---

# 🛠️ Tech Stack

### Backend

* Node.js
* TypeScript
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Validation

* Zod

### Testing

* Jest

### File Processing

* Multer
* csv-parser

### Documentation

* Swagger / OpenAPI 3.0

### DevOps

* Docker
* GitHub Actions

---

# 🏗️ Architecture

The application follows a layered architecture:

```txt
Request
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Database (Prisma + PostgreSQL)
```

### Responsibilities

* Routes → Endpoint definitions
* Controllers → Handle requests and responses
* Services → Business logic
* Repositories → Database operations
* Middleware → Authentication, Validation, Rate Limiting
* Validators → Zod request validation schemas

This separation improves maintainability, scalability and testability.

---

# 📁 Project Structure

```txt
src/
├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── tests/
├── utils/
└── validators/

prisma/
swagger/

.github/
└── workflows/
    └── ci.yml
```

---

# ⚙️ Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd lead-management-api
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

API_KEY=dectify-secret-key
```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Run Database Migrations

```bash
npx prisma migrate dev
```

## 6. Start Development Server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:5000
```

---

# 🔐 Authentication

All endpoints require:

```http
X-API-Key: dectify-secret-key
```

Example:

```http
GET /api/leads

X-API-Key: dectify-secret-key
```

---

# 📡 API Endpoints

## Leads

| Method | Endpoint       |
| ------ | -------------- |
| POST   | /api/leads     |
| GET    | /api/leads     |
| GET    | /api/leads/:id |
| PATCH  | /api/leads/:id |
| DELETE | /api/leads/:id |

---

## Bulk Import

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /api/import |

---

## Analytics

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /api/leads/stats |

---

# 🔍 Filtering, Sorting & Pagination

Supported query parameters:

| Parameter | Example    |
| --------- | ---------- |
| page      | 1          |
| limit     | 10         |
| source    | Referral   |
| minScore  | 50         |
| maxScore  | 90         |
| sort      | asc / desc |
| startDate | 2026-04-01 |
| endDate   | 2026-05-01 |

### Example

```http
GET /api/leads?page=1&limit=10&source=Referral&minScore=50&sort=desc
```

---

# 📊 Lead Scoring Formula

```txt
score =
0.40 × budget_fit +
0.30 × engagement +
0.30 × source_quality
```

### Budget Fit

Preferred Range:

```txt
₹50,00,000 – ₹2,00,00,000
```

### Engagement

* Recent inquiries score higher
* Message presence provides bonus points

### Source Quality

| Source   | Score |
| -------- | ----- |
| Referral | 100   |
| Google   | 80    |
| Walk-in  | 70    |
| Facebook | 60    |
| Other    | 40    |

---

# 📡 Sample API Requests

## Create Lead

```bash
curl -X POST http://localhost:5000/api/leads \
-H "Content-Type: application/json" \
-H "X-API-Key: dectify-secret-key" \
-d '{
"name":"Raj Kumar",
"email":"raj@example.com",
"phone":"9876543210",
"source":"Referral",
"budgetInr":10000000,
"location":"Delhi",
"propertyType":"2BHK",
"inquiryDate":"2026-05-20",
"message":"Interested in a property",
"status":"new"
}'
```

## Get Leads

```bash
curl -X GET "http://localhost:5000/api/leads?page=1&limit=10" \
-H "X-API-Key: dectify-secret-key"
```

## Filter Leads

```bash
curl -X GET "http://localhost:5000/api/leads?source=Referral&minScore=50&maxScore=90" \
-H "X-API-Key: dectify-secret-key"
```

## Analytics

```bash
curl -X GET "http://localhost:5000/api/leads/stats" \
-H "X-API-Key: dectify-secret-key"
```

## CSV Import

```bash
curl -X POST http://localhost:5000/api/import \
-H "X-API-Key: dectify-secret-key" \
-F "file=@sample_leads.csv"
```

---

# 🧪 Testing

Run tests:

```bash
npm test
```

Current test coverage includes:

* Budget Fit Logic
* Source Quality Logic
* Missing Data Handling
* Boundary Conditions
* Edge Cases

---

# ⚡ Rate Limiting

Implemented using Express Rate Limit.

Configuration:

```txt
100 requests per 15 minutes per IP
```

Returns:

```http
429 Too Many Requests
```

when the limit is exceeded.

---

# 📄 Swagger Documentation

Available at:

```txt
http://localhost:5000/api-docs
```

Use:

```txt
dectify-secret-key
```

in the Authorize dialog.

---

# 🐳 Docker

## Build Image

```bash
docker build -t lead-management-api .
```

## Run Container

```bash
docker run -p 5001:5000 lead-management-api
```

---

# 🔄 GitHub Actions CI

Workflow Location:

```txt
.github/workflows/ci.yml
```

Pipeline Steps:

* Install Dependencies
* Generate Prisma Client
* Run Unit Tests
* Build Project

Runs automatically on:

* Push to main
* Pull Requests

---

# 📋 Assumptions

* Email addresses are treated as unique lead identifiers.
* Unknown lead sources default to a score of 40.
* Missing budgets default to a score of 50.
* Scores are rounded to integers.
* API Key Authentication is used as required by the assessment.

---

# 🔮 Future Improvements

* JWT Authentication + Refresh Tokens
* Redis Caching
* Docker Compose
* Role-Based Access Control
* Background Job Processing
* Advanced Analytics Dashboard
* Live Deployment (Render / Railway)
* Fault-Tolerant CSV Import
* Per-row Failure Reporting
* Centralized Logging & Monitoring

---

# 👨‍💻 Author

Raj Kumar

Backend Developer | TypeScript | Node.js | PostgreSQL | Prisma
