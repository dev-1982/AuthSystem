# Auth System — NestJS + React

## Stack

- Backend: NestJS, TypeORM, PostgreSQL, JWT
- Frontend: React, TypeScript, Mantine
- Infra: Docker Compose

## Run

```bash
docker-compose up --build
Backend: http://localhost:3000/api
Frontend: cd frontend && npm install && npm run dev (или собрать в Docker по желанию).

Default admin
Email: admin@example.com

Password: admin123 (можно переопределить через env)