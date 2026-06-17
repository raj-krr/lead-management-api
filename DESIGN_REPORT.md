# Design Report

## Architecture Decisions

The application follows a layered architecture consisting of Routes, Controllers, Services, Repositories, and Database layers. This separation improves maintainability, readability, and testability. Business logic is isolated within service classes while database interactions are handled through repository classes using Prisma ORM.

## Lead Scoring Strategy

The lead scoring engine calculates a composite score between 0 and 100 using three weighted components:

* Budget Fit (40%)
* Engagement (30%)
* Source Quality (30%)

The scoring logic is configurable through centralized configuration files, making it easy to adjust business rules without modifying application logic.

## Missing Data Handling

The system gracefully handles missing or invalid values. For example, missing budget information receives a neutral score rather than causing failures. Unknown lead sources fall back to a default source quality score. Validation is performed using Zod schemas before data reaches the business layer.

## Filtering and Pagination

To support large datasets, filtering, sorting, and pagination were implemented at the database query level. Users can filter by score range, lead source, and date range while also controlling page size and sorting order.

## Bulk Import Design

CSV import functionality processes uploaded lead files and automatically calculates lead scores before storing records. Invalid records are isolated and counted without interrupting the import process, allowing partial success scenarios.

## Testing Strategy

Unit tests focus primarily on the scoring engine because it represents the core business logic of the application. Tests cover budget boundary conditions, missing values, source quality mappings, and score calculation behavior.

## Trade-Offs

API Key authentication was selected due to its simplicity and suitability for the assessment scope. While JWT authentication offers more flexibility, API keys provide a lightweight solution that satisfies security requirements with minimal complexity.

## Future Improvements

Potential improvements include JWT authentication, role-based access control, Redis caching, asynchronous CSV processing, advanced analytics, audit logging, and automated CI/CD deployment pipelines.
