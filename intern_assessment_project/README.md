# Intern Assessment: Simple Todo API

A small **NestJS + Prisma** project with JWT authentication and Todo CRUD functionality. Fully enhanced with validation, error handling, search, filtering, and Swagger documentation.

---

## 👋 Welcome!

This project demonstrates a simple **Todo API** with user authentication. It includes:

- JWT-based authentication (register/login)
- Todo CRUD operations
- Filtering, searching, and sorting
- Health check endpoint
- Proper validation and error handling
- Swagger API documentation

**Postman Collection**: [Click here to import](https://www.postman.com/spacecraft-specialist-4133668/workspace/dithara/collection/28169030-2dba8020-59ab-4fd0-bb49-3f03c889b661?action=share&creator=28169030&active-environment=28169030-ff29c67e-1cf8-4d8e-8cf5-bdcef093a705)


---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install

## 📚 Quick Navigation

- **`ASSIGNMENT.md`** - The actual tasks you need to complete
- **`SETUP_INSTRUCTIONS.md`** - How to get the project running
- **`README.md`** - This file (overview)
- **Swagger UI**: `http://localhost:3000/api`

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env` file (or copy from `env.example`):

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-key-change-in-production"
PORT=3000
```

### 3. Set Up Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Server

```bash
npm run start:dev
```

Server runs on `http://localhost:3000`

---

## 🧪 Test It Works

Try registering a user:

```bash
curl http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

You should get back an `accessToken` if everything is working!

---

## ✅ What's Already Implemented

- ✅ Authentication (register/login with JWT)
- ✅ Protected routes with guards
- ✅ Todo CRUD (create, read, update, delete)
- ✅ Basic filtering (by completion status)
- ✅ User isolation (users only see their own todos)

## 🎯 The Assignment

✅ API Endpoints
## 📝 Todos Endpoints

| **Method** | **Path** | **Description** | **Body / Query Parameters (optional)** |
|-------------|-----------|-----------------|----------------------------------------|
| **POST** | `/todos` | Create a new todo | **Body:** `title`, `description?`, `dueDate?` |
| **GET** | `/todos` | List todos with filters | **Query:** `status`, `title`, `from`, `to`, `sortBy`, `order` |
| **GET** | `/todos/:id` | Get a single todo | – |
| **PATCH** | `/todos/:id` | Update a todo | **Body:** `title?`, `description?`, `completed?`, `dueDate?` |
| **DELETE** | `/todos/:id` | Delete a todo | – |

---

## 💚 Health Check Endpoint

| **Method** | **Path** | **Description** |
|-------------|-----------|----------------|
| **GET** | `/health` | Returns API and DB status |


---

3. Query Parameters

For endpoints like GET /todos:

+ status – optional, completed or pending

+ title – optional, partial match on title

+ from – optional, ISO date string

+ to – optional, ISO date string

+ sortBy – optional, created, dueDate, title

+ order – optional, asc or desc

---

## 📖 Resources

- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **class-validator**: https://github.com/typestack/class-validator

**Ask questions if stuck!** Good luck! 🚀

