# Design Report

## Overview

This project is a Lead Management and Scoring API built using Node.js, TypeScript, Express.js, PostgreSQL, and Prisma ORM. The system enables lead management through CRUD operations, bulk CSV imports, lead scoring, filtering, pagination, authentication, and analytics. The primary goal was to design a scalable, maintainable, and production-oriented backend service that satisfies real-world business requirements.

---

## Architecture Decisions

The application follows a layered architecture consisting of Routes, Controllers, Services, Repositories, and Database layers.

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
PostgreSQL Database
```

This separation of concerns improves maintainability, readability, scalability, and testability. Controllers are responsible for request handling, Services contain business logic, Repositories manage database access, and Prisma ORM provides a type-safe interface to PostgreSQL.

The architecture also makes future enhancements easier, such as introducing caching, messaging systems, or additional data sources without significantly changing business logic.

---

## Lead Scoring Strategy

Lead quality is evaluated through a composite scoring model that produces a score between 0 and 100.

The final score is calculated using:

* Budget Fit (40%)
* Engagement (30%)
* Source Quality (30%)

The scoring engine is fully configurable through a centralized configuration module. Business rules, score weights, budget thresholds, and source quality mappings are isolated from application logic, allowing future modifications without changing core code.

This approach improves maintainability while ensuring scoring behavior remains predictable and testable.

---

## Missing Data Handling

Real-world lead data is often incomplete or inconsistent. The system handles missing or invalid values gracefully instead of failing requests.

Examples include:

* Missing budget values default to a neutral score.
* Unknown lead sources fall back to a default source quality score.
* Invalid request payloads are rejected using Zod validation.
* Duplicate email addresses are prevented through database-level constraints.

These decisions improve reliability while maintaining data quality.

---

## Filtering, Sorting and Pagination

To efficiently handle large datasets, filtering, sorting, and pagination are performed directly at the database layer.

Supported filters include:

* Lead Source
* Score Range
* Inquiry Date Range

Additional query options allow:

* Ascending and descending sorting
* Configurable page size
* Page-based pagination

Executing these operations within database queries improves performance and minimizes unnecessary memory usage.

---

## Bulk Import Design

The bulk import feature allows users to upload CSV files containing lead records.

Each imported lead is:

1. Parsed from the CSV file
2. Validated
3. Scored automatically
4. Stored in PostgreSQL

This design ensures imported records follow the same business rules as manually created leads and provides a consistent data processing pipeline.

---

## Security and Reliability

Several mechanisms were implemented to improve security and reliability:

* API Key Authentication using the `X-API-Key` header
* Request Validation using Zod schemas
* Express Rate Limiting to protect against excessive requests
* Centralized Error Handling
* Environment Variable Configuration for sensitive values

API Key Authentication was selected due to its simplicity and alignment with assessment requirements, while Rate Limiting demonstrates production-oriented API protection practices.

---

## Testing Strategy

Unit tests focus on the application's most critical business component: the lead scoring engine.

Test coverage includes:

* Budget boundary conditions
* Missing data scenarios
* Source quality mappings
* Edge cases
* Score calculation correctness

The project also uses GitHub Actions to automatically run tests and build verification on every push and pull request, helping maintain code quality throughout development.

---

## Trade-Offs

Several design trade-offs were made during development:

* API Key Authentication was chosen over JWT authentication to keep the solution lightweight while meeting requirements.
* Repository and Service layers introduce additional abstraction but significantly improve maintainability.
* CSV processing is performed synchronously for simplicity, though asynchronous processing would be more suitable for large-scale production workloads.

These decisions prioritize clarity, maintainability, and assessment scope while preserving extensibility.

---

## Future Improvements

Potential future enhancements include:

* JWT Authentication with Refresh Tokens
* Role-Based Access Control (RBAC)
* Redis Caching
* Background Job Processing
* Fault-Tolerant CSV Imports
* Per-row Failure Reporting
* Advanced Analytics Dashboard
* Docker Compose Support
* Centralized Logging and Monitoring
* Distributed Tracing and Observability

These improvements would further increase scalability, reliability, and operational visibility for production environments.

---
## Deployment

The application is deployed on Render and exposed through a public HTTPS endpoint. Deployment allows reviewers to interact with the API without local setup and demonstrates readiness for real-world environments.

Deployment includes:

* Public REST API
* Swagger Documentation
* PostgreSQL Database
* Environment Variable Configuration
* Dockerized Application

Production URL:

https://lead-management-api-oe0j.onrender.com

---
## Conclusion

The project was designed with a strong focus on clean architecture, maintainability, configurability, and production-oriented development practices. By combining layered architecture, configurable scoring logic, automated testing, API security, Docker support, Swagger documentation, rate limiting, and CI automation, the solution satisfies both the functional and non-functional requirements of the assessment while remaining extensible for future growth.
