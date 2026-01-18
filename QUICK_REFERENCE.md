# Quick Reference Guide

A fast lookup guide for common tasks in the Dating App project.

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Backend Setup
cd DatingApp.API
dotnet restore
# Edit appsettings.json with your config
dotnet ef database update
dotnet run

# 2. Frontend Setup (new terminal)
cd DatingApp-SPA
npm install
npm start

# 3. Access
# API: http://localhost:5000
# SPA: http://localhost:4200
```

---

## 📋 Essential Commands

### Backend (.NET Core)

```bash
# Run with auto-reload
dotnet watch run

# Build project
dotnet build

# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Drop database
dotnet ef database drop

# View migrations
dotnet ef migrations list

# Restore packages
dotnet restore

# Publish for production
dotnet publish -c Release -o ./publish
```

### Frontend (Angular)

```bash
# Install dependencies
npm install

# Start dev server
npm start
# or
ng serve --open

# Build for production
npm run build
# or
ng build --prod

# Run tests
npm test

# Run linting
npm run lint

# Generate component
ng g c components/ComponentName

# Generate service
ng g s services/ServiceName
```

---

## 🔐 Authentication Flow

**Login:**

1. User enters credentials → POST `/api/auth/login`
2. Server validates password → Returns JWT token
3. Client stores token in localStorage
4. Token attached to all future requests via interceptor
5. After 24 hours → Token expires → Re-login needed

**Token in Request:**

```
Header: Authorization: Bearer {token}
```

**Token Validation:**

- Checked in Startup.cs - JwtBearerDefaults
- Extracted in controllers via: `User.FindFirst(ClaimTypes.NameIdentifier).Value`

---

## 📡 API Endpoints Quick Reference

| Method | Endpoint                             | Auth | Purpose          |
| ------ | ------------------------------------ | ---- | ---------------- |
| POST   | `/api/auth/register`                 | ❌   | Create account   |
| POST   | `/api/auth/login`                    | ❌   | Login user       |
| GET    | `/api/users`                         | ✅   | Get user list    |
| GET    | `/api/users/{id}`                    | ✅   | Get user profile |
| PUT    | `/api/users/{id}`                    | ✅   | Update profile   |
| POST   | `/api/users/{id}/like/{recipientId}` | ✅   | Like user        |
| POST   | `/api/photos`                        | ✅   | Upload photo     |
| POST   | `/api/photos/{id}/setMain`           | ✅   | Set main photo   |
| DELETE | `/api/photos/{id}`                   | ✅   | Delete photo     |
| GET    | `/api/messages`                      | ✅   | Get messages     |
| POST   | `/api/messages`                      | ✅   | Send message     |

---

## 🗄️ Database Schema

**Database Type**: SQLite (file-based, no server required)
**Database File**: `datingapp.db` in `DatingApp.API/` folder

_For detailed schema information, see [Database Setup](../README.md#-database-setup) in README.md_

---

## 🛠️ Configuration Files

### Backend: `appsettings.json`

```json
{
  "AppSettings": {
    "Token": "your-very-long-secret-key-at-least-32-characters-use-a-random-generator"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=datingapp.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "CloudinarySettings": {
    "CloudName": "<USE-Yours>",
    "ApiKey": "<USE-Yours>",
    "ApiSecret": "<USE-Yours>"
  }
}
```

**Key Points:**

- **DefaultConnection**: SQLite file-based database (no server needed!)
- **Token**: JWT secret key - use a strong random value (min 32 chars)
- **CloudinarySettings**: Leave empty if you don't use photo uploads

### Frontend: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:5000/api/",
};
```

---

## 🔍 Dependency Injection Quick Ref

### Backend (ASP.NET Core)

```csharp
// Register in Startup.cs > ConfigureServices()
services.AddScoped<IAuthRepository, AuthRepository>();
services.AddScoped<IDatingRepository, DatingRepository>();

// Use in Controller
public class MyController : ControllerBase
{
    private readonly IAuthRepository _repo;

    public MyController(IAuthRepository repo)
    {
        _repo = repo;
    }
}
```

### Frontend (Angular)

```typescript
// Provided in module or service
@Injectable({ providedIn: "root" })
export class MyService {}

// Use in component
export class MyComponent {
  constructor(private service: MyService) {}
}
```

---

## 📁 File Organization

### Add Backend Feature

1. Create **Model** in `Models/`
2. Create **DTO** in `Dtos/`
3. Add **Repository Method** in `Data/`
4. Register in `Startup.cs`
5. Create **Controller** in `Controllers/`
6. Add **AutoMapper Profile** in `Helpers/AutoMapperProfiles.cs`
7. Create **Migration**: `dotnet ef migrations add FeatureName`
8. Update database: `dotnet ef database update`

### Add Frontend Feature

1. Create **Service** in `src/app/services/`
2. Create **Model** in `src/app/models/`
3. Create **Component** in `src/app/components/`
4. Add **Route** in `src/app/app-routing.module.ts`
5. Import in `src/app/app.module.ts` if needed

---

## 🐛 Debugging Tips

### Backend Issues

```csharp
// Check migrations status
dotnet ef migrations list

// View database in SQL Server Management Studio
// Server: localhost
// Database: DatingApp.DB

// Check logs in Startup.cs
if (env.IsDevelopment())
    app.UseDeveloperExceptionPage();
```

### Frontend Issues

```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install

# Check console in browser DevTools (F12)
# Network tab for API calls
# Application tab for localStorage
```

### JWT Token Issues

```typescript
// Decode token to check claims
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
const decoded = helper.decodeToken(token);
console.log(decoded); // Check expiration, claims

// Check if expired
const isExpired = helper.isTokenExpired(token);
```

---

## 📦 Version Reference

- **.NET Core**: 8.0
- **Angular**: 10
- **TypeScript**: 3.9
- **Bootstrap**: 4.5
- **SQLite**: 3
- **Node.js**: v12+
- **npm**: v6+

---

## 🔗 Important Files by Purpose

| Purpose        | Backend File         | Frontend File           |
| -------------- | -------------------- | ----------------------- |
| Configuration  | `appsettings.json`   | `environment.ts`        |
| Entry Point    | `Program.cs`         | `main.ts`               |
| Service Setup  | `Startup.cs`         | `app.module.ts`         |
| Authentication | `AuthController.cs`  | `auth.service.ts`       |
| Database       | `DataContext.cs`     | —                       |
| Routing        | `UsersController.cs` | `app-routing.module.ts` |
| Models         | `Models/*.cs`        | `models/*.ts`           |

---

## 💾 Data Persistence

### Backend

- **Password Hashing**: HMACSHA512 with salt
- **Database**: SQLite (file-based, no server required)
- **Migrations**: Automatic on startup (Program.cs)
- **Seeding**: UserSeedData.json

### Frontend

- **Token Storage**: localStorage (key: "token")
- **User Data**: localStorage (key: "user")
- **Logout**: Clears localStorage

---

## 🚢 Deployment Checklist

### Backend

- [ ] Change JWT token secret in `appsettings.json`
- [ ] Update database connection string
- [ ] Update Cloudinary credentials
- [ ] Enable HTTPS
- [ ] Build: `dotnet publish -c Release`

### Frontend

- [ ] Update API URL in `environment.prod.ts`
- [ ] Build: `ng build --prod`
- [ ] Test production build locally
- [ ] Deploy to Azure/Netlify

### Database

- [ ] Backup existing database
- [ ] Run migrations on production
- [ ] Verify all tables created
- [ ] Test queries

---

## 📞 Getting Help

 **Check Documentation**

   - `README.md` - Main guide
   - `DatingApp.API/BACKEND_DOCS.md` - Backend details
   - `DatingApp-SPA/FRONTEND_DOCS.md` - Frontend details

---

## 🎓 Quick Learning Paths

**First Time Setup**

1. Read README.md (Overview section)
2. Run Quick Start (5 minutes)
3. Create test account
4. Browse a few profiles
5. Send a message

**Understand Architecture**

1. Read Architecture section (README.md)
2. Review BACKEND_DOCS.md (Startup Configuration)
3. Review FRONTEND_DOCS.md (Architecture Patterns)
4. Trace one API call end-to-end

**Add a Feature**

1. Review "Adding New Features" in BACKEND_DOCS.md
2. Create backend first (model → repository → controller)
3. Test with Postman
4. Create frontend service
5. Create component
6. Test in UI

**Debug Issue**

1. Check browser console (F12)
2. Check backend console
3. Review Troubleshooting section
4. Check API response in Network tab
5. Use debugger to step through code

---

## 🔐 Security Reminders

- ✅ Passwords are hashed with HMACSHA512
- ✅ JWT tokens expire after 24 hours
- ✅ Authorization checks on all protected endpoints
- ⚠️ Never commit `appsettings.json` with real credentials
- ⚠️ Change default JWT secret in production
- ⚠️ Enable HTTPS in production
- ⚠️ Validate all user inputs

---

## 📈 Performance Tips

- Use pagination (default: 10 items per page)
- Implement lazy loading for images
- Enable database query caching
- Use production build (`ng build --prod`)
- Minify and bundle assets
- Use CDN for static files
- Add indexes on frequently queried columns

---

## 🔑 Test 

Register yourself and login to your account, After successful login below profiles you can see based on your gender preference.

**Female Users:**

- Alia | Deepika | Reba | Anna | Ashley

**Male Users:**

- Roy | Duke | John | Larsen | Simon

All users have complete profiles and photos pre-loaded.

---

**Last Updated**: January 2026  
**Project**: Dating App  
**Stack**: ASP.NET Core 8.0 + Angular 10 + SQLite

For detailed information, refer to:

- 📖 [Main README](../README.md)
- 🔧 [Backend Docs](../DatingApp.API/BACKEND_DOCS.md)
- 🎨 [Frontend Docs](../DatingApp-SPA/FRONTEND_DOCS.md)
