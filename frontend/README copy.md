# Autoflex — Products & Raw Materials Management

Full-stack web system for managing products, raw materials, and calculating production capacity based on available stock. Developed as a practical assessment for Autoflex/Projedata.

---

## Stack & Requirements

### Back-end

| Technology                 | Version         |
| -------------------------- | --------------- |
| Java                       | 25+             |
| Quarkus                    | 3.31.4          |
| Hibernate ORM (Panache)    | via Quarkus BOM |
| SmallRye OpenAPI (Swagger) | via Quarkus BOM |
| MapStruct                  | 1.6.3           |
| RESTEasy Jackson           | via Quarkus BOM |
| Maven                      | 3.9+            |

### Front-end

| Technology                    | Version              |
| ----------------------------- | -------------------- |
| Node.js                       | 20+                  |
| React                         | 19.2                 |
| TypeScript                    | 5.9                  |
| Vite                          | 7.3                  |
| TailwindCSS                   | 4.2                  |
| React Router DOM              | 7.13                 |
| TanStack React Query          | 5.90                 |
| React Hook Form + Zod         | 7.71 / via resolvers |
| React Compiler (babel plugin) | 1.0                  |

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/isaiasiotti18/autoflex.git
cd autoflex

# 2. Back-end (terminal 1)
cd backend/autoflex
./mvnw quarkus:dev          # Linux/Mac
mvnw.cmd quarkus:dev or .\mvnw.cmd quarkus:dev        # Windows

# 3. Front-end (terminal 2)
cd frontend
npm install
npm run dev
```

| Service    | URL                                |
| ---------- | ---------------------------------- |
| Front-end  | http://localhost:5173              |
| REST API   | http://localhost:8080/api          |
| Swagger UI | http://localhost:8080/q/swagger-ui |

> **Prerequisite:** Oracle running on Oracle Cloud with ADMIN user and password Autoflex54321.

---

## Detailed Configuration

### Seeds / Migrations

- **Automatic DDL:** Hibernate automatically generates/updates tables (`database.generation=update`).
- **Data Seed:** The `DataSeeder` class populates the database on first run (21 raw materials and 46 products with associations) if tables are empty.

### Useful Commands

```bash
# ── Back-end ──
./mvnw quarkus:dev                # Dev mode with hot-reload
./mvnw test                       # Run tests
./mvnw package                    # Build JAR
./mvnw package -Dnative           # Native build

# ── Front-end ──
npm run dev                       # Dev server (Vite)
npm run build                     # Production build
npm run lint                      # ESLint
npm run format:check              # Check formatting (Prettier)
npm run format:run                # Format code (Prettier)
npm run preview                   # Preview production build
```

---

## Project Structure

```
autoflex/
├── backend/autoflex/
│   ├── src/main/java/
│   │   ├── controller/           # REST endpoints (JAX-RS)
│   │   ├── domain/               # JPA entities (Product, RawMaterial, ProductRawMaterial)
│   │   ├── dto/                  # Request/response DTOs per domain
│   │   ├── exception/            # Exception handling
│   │   ├── helpers/production/   # Helpers
│   │   ├── infra/                # Seeder
│   │   ├── mapper/               # Mappers (Entity ↔ DTO)
│   │   ├── repository/           # Panache repositories
│   │   └── service/              # Service layer / business rules
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/
│   └── src/
│       ├── domain/                  # ENTITIES
│       ├── hooks/                   # Custom hooks
│       ├── pages/                   # Pages organized by feature
│       │   ├── products/            #   Products CRUD + raw materials association
│       │   ├── raw-materials/       #   Raw materials CRUD
│       │   ├── production-capacity/ #   Production capacity listing
│       │   └── _layout/             #   Main application layout
│       ├── services/                # API layer (fetch wrapper + endpoints)
│       ├── validations/             # Zod schemas for form validation
│       ├── utils/                   # Utility functions (currency formatting)
│       └── router.tsx               # Route definitions
│
└── README.md
```

---

## Implemented Features

- [x] Full **Products** CRUD (name, value)
- [x] Full **Raw Materials** CRUD (name, stock quantity)
- [x] **Association** of raw materials to products (with required quantity)
- [x] **Production capacity** — calculates how many products can be manufactured with current stock
- [x] Data listing
- [x] Form validation (Zod + React Hook Form)
- [x] Back-end validation (Bean Validation)
- [x] Global exception handling (ExceptionMappers)
- [x] Automatic data seeding on first run
- [x] Swagger/OpenAPI at `/q/swagger-ui`
- [x] Responsive UI
- [x] CORS configured
- [ ] Authentication/authorization
- [ ] Back-end pagination
- [ ] Cache
- [ ] Global state management with Redux

---

## Next Steps

### Known Limitations

- No authentication — any user can access all endpoints
- Listings return all records (no server-side pagination)
- No query caching
- Database running in cloud, but accessible by anyone
- No automated tests on front-end

### Planned Improvements

- Add JWT authentication (Quarkus OIDC or SmallRye JWT)
- Implement pagination and filters in the API
- Deploy backend + frontend
- Integration tests on back-end
- Unit and e2e tests on front-end
- Cache with Quarkus Cache

---

## Author

**Isaias Batista dos Santos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/isaias-iotti)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/isaiasiotti18)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:isaiasiottiprofissional@gmail.com)
