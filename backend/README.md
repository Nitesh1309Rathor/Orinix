# ORIONIX Backend

Backend API for the ORIONIX beauty e-commerce application.

## Planned stack

- Node.js and Express
- TypeScript
- Prisma and PostgreSQL
- JWT-based customer/admin authentication
- Razorpay payments

## Local setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Health check:

```text
http://localhost:4000/api/health
```
