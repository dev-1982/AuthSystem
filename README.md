# AuthSystem

Полноценная система аутентификации и управления пользователями с разделением ролей (**USER / ADMIN**), личным профилем и админ‑панелью.

Фронтенд: **React + TypeScript + Vite + Mantine UI**  
Бэкенд: Node.js / Nest 
Инфраструктура: **Docker / Docker Compose**

---

## Функциональность

**Публичная часть:**

- Регистрация нового пользователя
- Логин по email + пароль
- Хранение и использование access/refresh токенов
- Защищённые маршруты (profile, admin)

**Личный кабинет:**

- Просмотр профиля
- Выход (logout) с очисткой токенов

**Админ‑панель:**

- Страница `/admin/users`
- Таблица всех пользователей
- Поиск по email / id
- Сортировка по дате создания (Newest first / Oldest first)
- Отображение: `id`, `email`, `role`, `createdAt`

---

## Технологии

**Фронтенд:**

- React 18
- TypeScript
- Vite
- Mantine UI
- React Router
- Axios (или fetch) для запросов
- Context / hooks для Auth‑состояния

**Бэкенд:**

- Node.js
- Express (или Nest)
- JWT аутентификация
- Роли: USER / ADMIN
- Эндпоинты:
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /auth/profile`
  - `GET /admin/users` (только ADMIN)

**Инфраструктура:**

- Dockerfile для фронта
- Dockerfile для бэка
- `docker-compose.yml` для поднятия всего стека

---

## Структура проекта


auth-system/
  backend/
    Dockerfile
    package.json
    tsconfig.json
    src/
      main.ts
      app.module.ts
      config/
        config.module.ts
        config.service.ts
      database/
        database.module.ts
        database.service.ts
      users/
        users.module.ts
        users.entity.ts
        users.service.ts
        users.controller.ts
      auth/
        auth.module.ts
        auth.service.ts
        auth.controller.ts
        dto/
          login.dto.ts
          register.dto.ts
        jwt.strategy.ts
        jwt.guard.ts
        roles.guard.ts
        roles.decorator.ts
  frontend/
    package.json
    vite.config.ts
    index.html
    src/
      main.tsx
      App.tsx
      api.ts
      auth/AuthContext.tsx
      auth/ProtectedRoute.tsx
      pages/LoginPage.tsx
      pages/RegisterPage.tsx
      pages/ProfilePage.tsx
      pages/AdminUsersPage.tsx
  docker-compose.yml
  README.md

****Где задаются данные админа****
При первом запуске создаётся админ с email и паролем из yaml файла докера.
В docker-compose.yml:
yaml
ADMIN_EMAIL: admin@example.com
ADMIN_PASSWORD: admin123
(можно переопределить через env)
**********************************

Запуск локально (без Docker)
Backend
bash
cd backend
npm install
npm run dev
По умолчанию: http://localhost:3000

Frontend
bash
cd frontend
npm install
npm run dev
По умолчанию: http://localhost:5173

Запуск через Docker
bash
------------------------------------
на случай если что-то не работает:
в папке фронта: 
npm install @mantine/notifications
npm install @tabler/icons-react
------------------------------------
в папке проекта:
docker compose build
docker compose up
После этого:

фронт: http://localhost:5173

бэк: http://localhost:3000 (или порт из compose)

Переменные окружения
Backend
.env:

env
PORT=3000
JWT_SECRET=super-secret
DATABASE_URL=...
Frontend
.env или .env.local:

env
VITE_API_BASE_URL=http://localhost:3000
Маршруты фронтенда
/login — логин

/register — регистрация

/profile — профиль (только авторизованный пользователь)

/admin/users — список пользователей (только ADMIN)

Авторизация
При логине бэкенд возвращает accessToken (и, возможно, refreshToken)

Фронтенд сохраняет токен (в localStorage или cookie)

Все защищённые запросы отправляют Authorization: Bearer <token>

Роуты на фронте защищены через ProtectedRoute / RequireAuth

Финальная версия использует аккуратные стили для Mantine Select / Combobox, чтобы chevron оставался в рамках приличий.

TODO / Идеи для развития
Восстановление пароля

Подтверждение email

Логи действий админа

Пагинация и фильтры в /admin/users

Тёмная/светлая тема
<img width="1895" height="804" alt="Screenshot 2026-02-02 195354" src="https://github.com/user-attachments/assets/9ce53c5f-2f58-4b46-8f69-376a16fd10ec" />

Добавлена пагинация на странице админа, по 5,10,50 юзеров

<img width="1889" height="816" alt="Screenshot 2026-02-04 092819" src="https://github.com/user-attachments/assets/83a79f18-aa39-4881-8321-6bf4415e6e50" />
