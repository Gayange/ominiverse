# Intern Assessment Assignment

**Duration**: 1 day (6-8 hours)  
**Due**: Submit by end of day

---

## 🎯 Your Mission

The project has a **working authentication system** and **basic CRUD for todos**. Your job is to:

### ✅ Part 1: Add Input Validation (2 hours)

**Current State**: Controllers accept `any` type with no validation.

**Your Task**: Add proper validation to all DTOs using `class-validator` decorators.

1. **Auth DTOs** (`src/modules/auth/auth.controller.ts`)
   - `RegisterDto`: Validate email, password (min 6 chars), optional name
   - `LoginDto`: Validate email and password

2. **Todo DTOs** (create `src/modules/todos/dto/create-todo.dto.ts` and others)
   - `CreateTodoDto`: title (required, string), description (optional), dueDate (optional, must be valid date)
   - `UpdateTodoDto`: All fields optional
   
3. **Use DTOs in controllers** with proper typing

**Acceptance Criteria**:
- ✅ Sending invalid email returns 400 error
- ✅ Sending password < 6 chars returns 400 error
- ✅ Sending invalid date returns 400 error
- ✅ Error messages are clear and helpful

---

### ✅ Part 2: Enhance Error Handling (1 hour)

**Current State**: Some error messages are generic.

**Your Task**: Improve error handling across the app.

1. **Auth Service**:
   - Better error messages for existing users
   - Clear distinction between wrong email and wrong password

2. **Todo Service**:
   - Add check for duplicate todos (same title)
   - Handle date validation errors gracefully
   - Add helpful not-found messages

3. **General**:
   - Ensure all errors have proper HTTP status codes
   - Consistent error response format

**Acceptance Criteria**:
- ✅ All 404s have helpful messages ("Todo with ID xxx not found")
- ✅ Validation errors are descriptive
- ✅ No generic "Internal Server Error" messages
- ✅ Consistent error response structure

---

### ✅ Part 3: Add Search and Filtering (2 hours)

**Current State**: Todos can only be filtered by `completed` status.

**Your Task**: Add more filtering capabilities.

1. **Add query parameters**:
   - `title` - partial match on title
   - `from` - due date from (ISO date)
   - `to` - due date to (ISO date)
   - Keep existing `status` (completed/pending) filter

2. **Update `todos.service.ts`** to support these filters

3. **Add sorting**:
   - `sortBy` parameter: `created`, `dueDate`, `title`
   - `order` parameter: `asc` or `desc`

**Acceptance Criteria**:
- ✅ `GET /api/v1/todos?title=meeting` returns todos with "meeting" in title
- ✅ `GET /api/v1/todos?from=2024-01-01&to=2024-12-31` returns todos due in range
- ✅ `GET /api/v1/todos?sortBy=dueDate&order=asc` sorts by due date ascending
- ✅ Multiple filters work together
- ✅ Default sorting is by created date (desc)

---

### ✅ Part 4: Add a Health Check Endpoint (30 mins)

**Current State**: No health check endpoint.

**Your Task**: Create a simple health check.

1. Create `src/health.controller.ts`
2. Add `GET /api/v1/health` that returns:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-10-31T12:00:00.000Z",
     "database": "connected"
   }
   ```

3. Wire it up in `app.module.ts`

**Acceptance Criteria**:
- ✅ Endpoint returns 200 OK
- ✅ Response includes status, timestamp, and database status
- ✅ Works without authentication

---

### ✅ Part 5: Polish and Documentation (1 hour)

**Your Task**: Make the code production-ready.

1. **Code Quality**:
   - Remove any console.logs
   - Add JSDoc comments to services
   - Ensure consistent code style

2. **Documentation**:
   - Update `README.md` with API endpoints
   - Add example requests/responses for each endpoint
   - Document all query parameters

3. **Testing**:
   - Create a Postman collection OR
   - Document all curl commands to test endpoints
   - Include both success and failure cases

**Acceptance Criteria**:
- ✅ No console.logs in production code
- ✅ README has complete API documentation
- ✅ Examples provided for all endpoints
- ✅ Code is well-commented

---

## 📝 Deliverables

Submit your solution as a zip file containing:

1. **All code** (all files in the project)
2. **Documentation**:
   - Updated `README.md` with API docs
   - Test report (Postman collection or curl commands)
3. **Brief summary** (2-3 paragraphs):
   - What you accomplished
   - Time taken for each part
   - Biggest challenges faced
   - What you learned

---

## ✅ Acceptance Criteria Summary

Your solution must:
1. ✅ Have proper input validation on all endpoints
2. ✅ Handle errors gracefully with helpful messages
3. ✅ Support filtering by title, date range, and status
4. ✅ Support sorting by various fields
5. ✅ Have a working health check endpoint
6. ✅ Be well-documented in README
7. ✅ Have no console.logs
8. ✅ Include test examples for all endpoints
9. ✅ Return proper HTTP status codes
10. ✅ Follow NestJS best practices

---

## 🎓 What We're Looking For

### Technical Skills
- Understanding of NestJS patterns
- Proper DTO validation
- Error handling strategies
- Database query building
- API design principles
- Code organization

### Quality Indicators
- Clean, readable code
- Proper TypeScript usage
- Helpful error messages
- Good documentation
- Thoughtful solutions
- Following conventions

### Red Flags
- ❌ Skipping validation
- ❌ Poor error handling
- ❌ Hard-coded values
- ❌ Breaking existing functionality
- ❌ Missing documentation
- ❌ Not following patterns

---

## 🆘 Resources

- **NestJS Docs**: https://docs.nestjs.com
- **Prisma Docs**: https://www.prisma.io/docs
- **class-validator**: https://github.com/typestack/class-validator
- **Existing code**: Study auth and todos modules for patterns

**Ask questions if unclear!** We're here to help. 🙌

---

## ⚠️ Important Notes

- **Don't modify** existing working code unless adding features
- **Follow existing patterns** - consistency matters
- **Test thoroughly** - edge cases matter
- **Ask questions** - better to ask than guess
- **Document blockers** - shows problem-solving skills

---

Good luck! 🚀

