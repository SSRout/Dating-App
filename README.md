# Dating App - Full Stack

A full-stack dating application featuring **ASP.NET Core 8.0** backend, **React 18** frontend, and **Angular 17.3** SPA. Modern, scalable architecture with user authentication, profiles, messaging, and photo management.

## 🚀 Quick Start

### Prerequisites

- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 16+** - [Download](https://nodejs.org/)

### Run Backend + React Frontend

```bash
# Terminal 1: Backend API
cd DatingApp.API
dotnet restore
dotnet ef database update
dotnet run
# API running on http://localhost:5000

# Terminal 2: React Frontend (in new terminal)
cd DatingApp-React
npm install
npm run dev
# App running on http://localhost:5173
```

### Run Backend + Angular SPA Frontend

```bash
# Terminal 1: Backend API
cd DatingApp.API
dotnet restore
dotnet ef database update
dotnet run

# Terminal 2: Angular Frontend (in new terminal)
cd DatingApp-SPA
npm install
npm start
# App running on http://localhost:4200
```

## 🔧 Configuration

### Backend (appsettings.json)

```json
{
  "AppSettings": {
    "Token": "your-secret-key-32-chars-minimum"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=datingapp.db"
  },
  "CloudinarySettings": {
    "CloudName": "your-cloud-name",
    "ApiKey": "your-api-key",
    "ApiSecret": "your-api-secret"
  }
}
```

- **Token**: Generate a strong random 32+ character key for JWT signing
- **Database**: SQLite file-based (no server installation needed!)
- **Cloudinary**: Optional. [Sign up free](https://cloudinary.com/) for photo uploads

### Frontend - React (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Frontend - Angular (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:5000/api/",
};
```

## 🔑 Test Credentials

All seed users use password: **`Password@123`**

| Username | Display Name | Username | Display Name |
| -------- | ------------ | -------- | ------------ |
| alia     | Lola         | roy      | Roy          |
| deepika  | Dorothy      | duke     | Duke         |
| reba     | Reba         | john     | John         |
| anna     | Annmarie     | larsen   | Larsen       |
| ashley   | Ashley       | simon    | Simon        |

## 📚 Technology Stack

### Backend

- ASP.NET Core 8.0 | SQLite | Entity Framework Core
- JWT Authentication | AutoMapper | CloudinaryDotNet

### Frontend - React

- React 18.3 | TypeScript | Tailwind CSS | Vite
- Zustand | React Router | Axios | Lucide Icons

### Frontend - Angular

- Angular 17.3 | TypeScript | Bootstrap 5
- ngx-bootstrap | @auth0/angular-jwt | Alertifyjs

## 🔌 Core API Endpoints

```http
# Authentication
POST   /api/auth/register
POST   /api/auth/login

# Users
GET    /api/users?pageNumber=1&pageSize=10&gender=female&minAge=25&maxAge=35
GET    /api/users/{id}
PUT    /api/users/{id}

# Likes
POST   /api/users/{id}/like/{recipientId}
DELETE /api/users/{id}/like/{recipientId}

# Photos
POST   /api/photos
POST   /api/photos/{photoId}/setMain
DELETE /api/photos/{photoId}

# Messages
GET    /api/messages?pageNumber=1&pageSize=10&messageContainer=Unread
POST   /api/messages
```

## 📂 Project Structure

```
DatingApp/
├── DatingApp.API/              # ASP.NET Core Backend
│   ├── Controllers/            # API endpoints
│   ├── Models/                 # Database entities
│   ├── Dtos/                   # Data transfer objects
│   ├── Data/                   # Repository layer
│   ├── Helpers/                # Utilities & AutoMapper
│   ├── Migrations/             # EF Core migrations
│   ├── appsettings.json        # Configuration
│   └── Program.cs / Startup.cs
│
├── DatingApp-React/            # Modern React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── store/              # Zustand state
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
└── DatingApp-SPA/              # Traditional Angular SPA
    ├── src/
    │   ├── app/                # Angular modules
    │   ├── components/         # Reusable components
    │   ├── services/           # API services
    │   └── environments/
    ├── package.json
    ├── angular.json
    └── tsconfig.json
```

## ✨ Features

- ✅ User registration & JWT authentication
- ✅ Search & filter user profiles
- ✅ Like/unlike users
- ✅ Real-time messaging
- ✅ Photo upload to Cloudinary
- ✅ Pagination & sorting
- ✅ Last activity tracking
- ✅ Responsive design

## 🛠️ Development Commands

### Backend

```bash
cd DatingApp.API

dotnet restore              # Install dependencies
dotnet build                # Build project
dotnet watch run            # Run with live reload
dotnet ef database update   # Apply migrations
dotnet ef migrations add    # Create new migration
dotnet publish -c Release   # Build for production
```

### React Frontend

```bash
cd DatingApp-React

npm install                 # Install dependencies
npm run dev                 # Start dev server (http://localhost:5173)
npm run build               # Build for production
npm run lint                # Run linter
```

### Angular Frontend

```bash
cd DatingApp-SPA

npm install                 # Install dependencies
npm start                   # Start dev server (http://localhost:4200)
ng build --configuration production
```

## 🐛 Troubleshooting

| Issue                         | Solution                                                               |
| ----------------------------- | ---------------------------------------------------------------------- |
| **Database connection fails** | Run `dotnet ef database update` to create SQLite db                    |
| **API not found (404)**       | Verify backend running on `http://localhost:5000`                      |
| **Module not found**          | Run `npm install` in frontend directory                                |
| **Unauthorized errors**       | Ensure logged in and token in localStorage                             |
| **Photo upload fails**        | Check Cloudinary credentials in appsettings.json                       |
| **Build fails**               | Delete `node_modules` and `package-lock.json`, run `npm install` again |

## 🔒 Security Notes

- Change JWT token to strong 32+ character key
- Never commit `appsettings.json` with real credentials
- Use environment variables for secrets in production
- Update Cloudinary credentials with your account
- Always validate user input on backend
- Enable HTTPS in production

## 📖 API Example

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "alia", "password": "Password@123"}'

# Response:
# {
#   "token": "eyJhbGc...",
#   "user": { "id": 1, "username": "alia", "knownAs": "Lola" }
# }
```

### Get Users with Filters

```bash
curl -X GET "http://localhost:5000/api/users?pageNumber=1&pageSize=10&gender=female&minAge=25&maxAge=35" \
  -H "Authorization: Bearer eyJhbGc..."
```

## 🚀 Deployment

### Backend

```bash
cd DatingApp.API
dotnet publish -c Release -o ./publish
# Deploy 'publish' folder to hosting
```

### Frontend - React

```bash
cd DatingApp-React
npm run build
# Deploy 'dist' folder to static hosting
```

### Frontend - Angular

```bash
cd DatingApp-SPA
ng build --configuration production
# Deploy 'dist/datingapp-spa' folder to static hosting
```

## 📚 Resources

- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [React 18 Documentation](https://react.dev/)
- [Angular 17.3 Documentation](https://angular.io/docs)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [Cloudinary API](https://cloudinary.com/developers)

## ✅ Checklist

- [ ] .NET 8 SDK installed
- [ ] Node.js 16+ installed
- [ ] `appsettings.json` configured with JWT token
- [ ] `dotnet ef database update` executed
- [ ] Backend starts without errors
- [ ] Frontend npm packages installed
- [ ] Frontend dev server starts
- [ ] Can login with seed user

## 📄 License

Educational project.

---

**Happy coding! 🚀**
