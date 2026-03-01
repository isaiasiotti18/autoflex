# Autoflex — Gestão de Produtos & Matérias-Primas

Sistema web fullstack para gerenciar produtos, matérias-primas e calcular a capacidade produtiva com base no estoque disponível. Desenvolvido como teste prático para a Autoflex/Projedata.

---

## Stack & Requisitos

### Back-end

| Tecnologia                 | Versão          |
| -------------------------- | --------------- |
| Java                       | 25+             |
| Quarkus                    | 3.31.4          |
| Hibernate ORM (Panache)    | via Quarkus BOM |
| MapStruct                  | 1.6.3           |
| RESTEasy Jackson           | via Quarkus BOM |
| SmallRye OpenAPI (Swagger) | via Quarkus BOM |
| Maven                      | 3.9+            |

### Front-end

| Tecnologia                    | Versão               |
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

### Dependências externas

| Serviço                | Detalhes                                  |
| ---------------------- | ----------------------------------------- |
| **Oracle Database XE** | Instância local — `localhost:1521/XEPDB1` |

---

## Quick Start

```bash
# 1. Clonar o repositório
git clone https://github.com/isaiasiotti18/autoflex.git
cd autoflex

# 2. Back-end (terminal 1)
cd backend/autoflex
./mvnw quarkus:dev          # Linux/Mac
mvnw.cmd quarkus:dev ou .\mvnw.cmd quarkus:dev        # Windows

# 3. Front-end (terminal 2)
cd frontend
npm install
npm run dev
```

| Serviço    | URL                                |
| ---------- | ---------------------------------- |
| Front-end  | http://localhost:5173              |
| API REST   | http://localhost:8080/api          |
| Swagger UI | http://localhost:8080/q/swagger-ui |

> **Pré-requisito:** Oracle rodando na Oracle Cloud com o usuario ADMIN senha Autoflex54321.

---

## Configuração Detalhada

### Seeds / Migrations

- **DDL automático:** Hibernate gera/atualiza as tabelas automaticamente (`database.generation=update`).
- **Seed de dados:** A classe `DataSeeder` popula o banco na primeira execução (21 matérias-primas e 46 produtos com associações) caso as tabelas estejam vazias.

### Comandos úteis

```bash
# ── Back-end ──
./mvnw quarkus:dev                # Modo dev com hot-reload
./mvnw test                       # Rodar testes
./mvnw package                    # Build do JAR
./mvnw package -Dnative           # Build nativo

# ── Front-end ──
npm run dev                       # Dev server (Vite)
npm run build                     # Build de produção
npm run lint                      # ESLint
npm run format:check              # Verificar formatação (Prettier)
npm run format:run                # Formatar código (Prettier)
npm run preview                   # Preview do build de produção
```

---

## Estrutura do Projeto

```
autoflex/
├── backend/autoflex/
│   ├── src/main/java/
│   │   ├── controller/           # Endpoints REST (JAX-RS)
│   │   ├── domain/               # Entidades JPA (Product, RawMaterial, ProductRawMaterial)
│   │   ├── dto/                  # DTOs de request/response por domínio
│   │   ├── exception/            # tratamento de exceções
│   │   ├── helpers/production/   # helpers
│   │   ├── infra/                # seeder
│   │   ├── mapper/               # mappers (Entity ↔ DTO)
│   │   ├── repository/           # Repositórios Panache
│   │   └── service/              # Camada de serviço / regras de negócio
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/
│   └── src/
│       ├── domain/                  # ENTIDADES
│       ├── hooks/                   # Custom hooks
│       ├── pages/                   # Páginas organizadas por feature
│       │   ├── products/            #   CRUD de produtos + associação de matérias-primas
│       │   ├── raw-materials/       #   CRUD de matérias-primas
│       │   ├── production-capacity/ # Listagem de capacidade produtiva
│       │   └── _layout/             #   Layout principal da aplicação
│       ├── services/                # Camada de API (fetch wrapper + endpoints)
│       ├── validations/             # Schemas Zod para validação de formulários
│       ├── utils/                   # Funções utilitárias (formatação de moeda)
│       └── router.tsx               # Definição de rotas
│
└── README.md
```

---

## Funcionalidades Implementadas

- [x] CRUD completo de **Produtos** (nome, valor)
- [x] CRUD completo de **Matérias-Primas** (nome, quantidade em estoque)
- [x] **Associação** de matérias-primas a produtos (com quantidade necessária)
- [x] **Capacidade produtiva** — cálculo de quantos produtos podem ser fabricados com o estoque atual
- [x] Listagem com dados
- [x] Validação de formulários (Zod + React Hook Form)
- [x] Validação no back-end (Bean Validation)
- [x] Tratamento global de exceções (ExceptionMappers)
- [x] Seed automático de dados na primeira execução
- [x] Swagger/OpenAPI em `/q/swagger-ui`
- [x] UI responsiva
- [x] CORS configurado
- [ ] Autenticação/autorização
- [ ] Paginação no back-end
- [ ] Cache
- [ ] Controlde de estado global com Redux

---

## Próximos Passos

### Limitações conhecidas

- Sem autenticação — qualquer usuário pode acessar todos os endpoints
- Listagens retornam todos os registros (sem paginação server-side)
- Sem cache de consultas
- Banco de dados rodando em clouding, porém qualquer um pode acessar
- Sem testes automatizados no front-end

### Melhorias planejadas

- Adicionar autenticação JWT (Quarkus OIDC ou SmallRye JWT)
- Implementar paginação e filtros na API
- Subir backend + frontend
- Testes de integração no back-end com
- Testes unitários e e2e no front-end
- Cache com Quarkus Cache

---

## Autor

**Isaias Batista dos Santos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/isaias-iotti)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/isaiasiotti18)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:isaiasiottiprofissional@gmail.com)
