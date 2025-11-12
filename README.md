# Product Tracker — Backend

This is the **backend API** for the Product Tracker App — built with **NestJS** and **TypeScript**.

- **Frontend Repo:** [product-tracker-frontend](https://github.com/Shahzaibkhan-4/product-tracker-frontend)



# Product Tracker Backend

A NestJS backend for product management, orders, and user authentication with PostgreSQL.

##  Development Setup

### Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@example.com` | `Admin123` |
| Customer | `customer@example.com` | `Customer123` |

### API Endpoints
- **Authentication:** `POST /auth/login`, `POST /auth/register`
- **Products:** `GET /products/public`, `GET /products/admin/all`
- **Orders:** `GET /orders/user/:userId`, `POST /orders`
- **Users:** `GET /auth/users` (Admin only)

### Database
- **Type:** PostgreSQL
- **Host:** localhost:5432
- **Database:** product_tracker
- **Username:** postgres
- **Password:** postgress@123

## Installation

```bash
npm install

# development
npm run start:dev

# production
npm run start:prod


