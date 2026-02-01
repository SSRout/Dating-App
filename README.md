# Dating App - Full Stack Application

A modern full-stack dating application built with **ASP.NET Core 8.0** backend and **Angular 10** frontend. This application allows users to create profiles, browse other users, send messages, and like profiles.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Prerequisites](#prerequisites)
5. [Quick Start Guide](#quick-start-guide)
6. [Detailed Setup Instructions](#detailed-setup-instructions)
7. [Database Setup](#database-setup)
8. [API Endpoints](#api-endpoints)
9. [Project Structure](#project-structure)
10. [Key Features](#key-features)
11. [Configuration](#configuration)
12. [Troubleshooting](#troubleshooting)
13. [Development Workflow](#development-workflow)
14. [References](#references)

---

## 🎯 Project Overview

The Dating App is a full-stack web application that demonstrates modern development practices using:

- **Backend**: RESTful API with authentication and authorization
- **Frontend**: Single Page Application with responsive UI
- **Database**: SQL lite with Entity Framework Core
- **Cloud Storage**: Cloudinary for photo uploads

### Core Features

- User authentication and JWT-based authorization
- User profile creation and management
- Browse and filter user profiles
- Like/unlike functionality
- Real-time messaging between users
- Photo upload to Cloudinary
- Pagination for user listings
- Last activity tracking

---

## 🛠 Technology Stack

### Backend

- **Framework**: ASP.NET Core 8.0
- **Database**: SQLite 3 (file-based, no server required!)
- **ORM**: Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **Mapping**: AutoMapper
- **Photo Storage**: CloudinaryDotNet
- **API Style**: RESTful

### Frontend

- **Framework**: Angular 10
- **Build Tool**: Angular CLI
- **Node**: v12+
- **CSS Framework**: Bootstrap 4 with Bootswatch themes
- **UI Components**: ngx-bootstrap
- **Authentication**: @auth0/angular-jwt
- **File Upload**: ng2-file-upload
- **Gallery**: @kolkov/ngx-gallery
- **Notifications**: alertifyjs
- **Time Display**: ngx-timeago
- **Icons**: Font Awesome 4

### Development

- **Language**: TypeScript 3.9
- **Testing**: Jasmine & Karma
- **Linting**: TSLint
- **E2E Testing**: Protractor

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────┐
│   Angular 10 SPA (DatingApp-SPA)    │
│  ├─ Components                      │
│  ├─ Services                        │
│  ├─ Guards                          │
│  └─ Interceptors                    │
└──────────────────┬──────────────────┘
                   │ HTTP/REST
                   ↓
┌─────────────────────────────────────┐
│   ASP.NET Core API (DatingApp.API)  │
│  ├─ Controllers                     │
│  ├─ Services/Repositories           │
│  ├─ Middleware                      │
│  └─ Authentication                  │
└──────────────────┬──────────────────┘
                   │ Entity Framework
                   ↓
┌─────────────────────────────────────┐
│   SQLite Database (datingapp.db)    │
│  ├─ Users Table                     │
│  ├─ Photos Table                    │
│  ├─ Likes Table                     │
│  └─ Messages Table                  │
└─────────────────────────────────────┘
```

### API Layers

1. **Controllers**: Handle HTTP requests and route to services
2. **Repositories**: Manage data access and business logic
3. **DTOs**: Data Transfer Objects for request/response
4. **Models**: Database entity models
5. **Helpers**: Utilities, AutoMapper profiles, and extensions

---

## 📦 Prerequisites

Before setting up the project, ensure you have the following installed:

### Backend Requirements

- **.NET 8**
- **No database server required** - SQLite is embedded and file-based

### Frontend Requirements

- **Node.js v12+** - [Download](https://nodejs.org/)
- **npm v6+** (comes with Node.js)
- **Angular CLI** - Will be installed as part of setup

### Additional Requirements

- **Cloudinary Account** - [Sign up free](https://cloudinary.com/) for photo hosting
- **Git** - For version control
- **VS Code** or **Visual Studio** - For development

---

## 🚀 Quick Start Guide

### For Experienced Developers

1. **Clone and Navigate**

   ```bash
   git clone <repository-url>
   cd DatingApp
   ```

2. **Backend Setup**

   ```bash
   cd DatingApp.API
   dotnet restore
   # Configure appsettings.json (see Configuration section)
   dotnet ef database update
   dotnet run
   ```

3. **Frontend Setup** (in new terminal)

   ```bash
   cd DatingApp-SPA
   npm install
   npm start
   ```

4. **Access the Application**
   - API: http://localhost:5000
   - SPA: http://localhost:4200

---

## 📝 Detailed Setup Instructions

### Step 1: Backend Setup

#### 1.1 Configure Application Settings

The application is pre-configured to use **SQLite** (file-based database - no server needed!). Update `appsettings.json` in `DatingApp.API/` folder with your JWT token and Cloudinary settings:

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
    "CloudName": "",
    "ApiKey": "",
    "ApiSecret": ""
  }
}
```

**Configuration Details:**

- **Token**: Secret key for JWT signing (generate a strong random value, min 32 characters)
- **DefaultConnection**: `Data Source=datingapp.db` - SQLite database file. **No server installation needed!** The file will be created automatically in the `DatingApp.API` folder.
- **CloudinarySettings**: Get these from your Cloudinary dashboard (optional for photo features)

**Benefits of SQLite for Development:**

- ✅ Zero configuration - works out of the box
- ✅ No external database server to install
- ✅ Perfect for prototyping and testing
- ✅ Easy to share (just include migrations, not the .db file)
- ✅ Can migrate to SQL Server later if needed
- ✅ Cross-platform (Windows, Mac, Linux)

#### 1.2 Install .NET Dependencies

```bash
cd DatingApp.API
dotnet restore
```

#### 1.3 Install NuGet Packages (if not already restored)

```bash
dotnet add package Microsoft.IdentityModel.Tokens
dotnet add package System.IdentityModel.Tokens.Jwt
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package CloudinaryDotNet
```

### Step 2: Database Setup

#### 2.1 Create Database and Run Migrations

**Using .NET CLI:**

```bash
cd DatingApp.API
dotnet ef database update
```

This will:

- Create the SQLite database file: `datingapp.db` (in the `DatingApp.API` folder)
- Run all Entity Framework migrations
- Seed initial dummy user data from `Data/UserSeedData.json`

**No SQL Server installation needed!** SQLite is embedded in Entity Framework Core and creates a local file-based database.

#### 2.2 Verify Database Creation

Check that `datingapp.db` file exists in `DatingApp.API/` folder:

```bash
# On Windows PowerShell
dir datingapp.db

# On Mac/Linux
ls -la datingapp.db
```

You can optionally view the database using:

- **DB Browser for SQLite**: [Download](https://sqlitebrowser.org/) - Free GUI tool
- **.NET CLI**: `dotnet ef dbcontext info`

### Step 3: Frontend Setup

#### 3.1 Install Dependencies

```bash
cd DatingApp-SPA
npm install
```

This installs all packages from package.json including:

- Angular core libraries
- Bootstrap & Bootswatch for styling
- Authentication library (@auth0/angular-jwt)
- File upload component
- Photo gallery
- Notification library (alertifyjs)

#### 3.2 Configure API URL (if needed)

Update the API base URL in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:5000/api/",
};
```

### Step 4: Run the Application

#### Terminal 1 - Start Backend API

```bash
cd DatingApp.API
dotnet run
# or use: dotnet watch run (for auto-reload on code changes)
```

Expected output:

```
Hosting environment: Development
Content root path: C:\path\to\DatingApp.API
Now listening on: http://localhost:5000
```

#### Terminal 2 - Start Frontend SPA

```bash
cd DatingApp-SPA
npm start
# or use: ng serve
```

Expected output:

```
✔ Compiled successfully.
✔ Live development server is running on http://localhost:4200
```

#### 3. Access Application

Open browser and navigate to: **http://localhost:4200**

---

## 🗄 Database Setup

_For detailed table structure information, refer to the [Migration Commands](#migration-commands) section below._

### Migration Commands

**Add New Migration:**

```bash
# Using CLI
dotnet ef migrations add <MigrationName>

# Using PowerShell
Add-Migration <MigrationName>
```

**Update Database:**

```bash
# Using CLI
dotnet ef database update

# Using PowerShell
Update-Database
```

**Remove Latest Migration:**

```bash
# Using CLI
dotnet ef migrations remove

# Using PowerShell
Remove-Migration
```

**View All Migrations:**

```bash
dotnet ef migrations list
```

**Drop Database:**

```bash
dotnet ef database drop
```

---

## 🔑 Dummy User Credentials

Once the database is seeded, you can login with any of these test accounts. All use the password: **`Password@123`**

**Female Users:**

- Username: **Alia**
- Username: **Deepika**
- Username: **Reba**
- Username: **Anna**
- Username: **Ashley**

**Male Users:**

- Username: **Roy**
- Username: **Duke**
- Username: **John**
- Username: **Larsen**
- Username: **Simon**

All users have complete profile information and photos loaded from `Data/UserSeedData.json`.

---

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john.doe",
  "password": "Password@123"
}

Response (201 Created):
{
  "id": 1,
  "knownAs": "John",
  "city": "",
  "country": "",
  "created": "2023-01-15T10:30:00",
  "lastActive": "2023-01-15T10:30:00"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john.doe",
  "password": "Password@123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john.doe",
    "knownAs": "John",
    "photoUrl": "https://..."
  }
}
```

### Users Endpoints

#### Get All Users (with Filtering & Pagination)

```
GET /api/users?pageNumber=1&pageSize=10&gender=female&minAge=25&maxAge=35&orderBy=lastActive
Authorization: Bearer {token}

Query Parameters:
- pageNumber: Current page (default: 1)
- pageSize: Items per page (default: 10)
- gender: Filter by gender (male/female)
- minAge: Minimum age filter
- maxAge: Maximum age filter
- orderBy: Sort by 'lastActive' or 'created'

Response (200 OK):
[
  {
    "id": 2,
    "username": "jane.smith",
    "knownAs": "Jane",
    "age": 28,
    "gender": "female",
    "city": "New York",
    "country": "USA",
    "photoUrl": "https://..."
  }
]

Headers:
- Pagination: {"currentPage":1,"itemsPerPage":10,"totalItems":50,"totalPages":5}
```

#### Get User Details

```
GET /api/users/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "id": 2,
  "username": "jane.smith",
  "knownAs": "Jane",
  "age": 28,
  "gender": "female",
  "introduction": "Love hiking and coffee",
  "lookingFor": "Someone adventurous",
  "interests": "hiking, travel, photography",
  "city": "New York",
  "country": "USA",
  "photoUrl": "https://...",
  "photos": [
    {
      "id": 1,
      "url": "https://...",
      "description": "Profile picture",
      "dateAdded": "2023-01-10T00:00:00",
      "isMain": true
    }
  ]
}
```

#### Update User Profile

```
PUT /api/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "knownAs": "John D",
  "introduction": "Software developer",
  "lookingFor": "Someone genuine",
  "interests": "coding, gaming",
  "city": "San Francisco",
  "country": "USA"
}

Response (204 No Content)
```

### Likes Endpoints

#### Like a User

```
POST /api/users/{id}/like/{recipientId}
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "User liked successfully"
}

Error (400 Bad Request):
{
  "error": "Already Liked This User"
}
```

### Photos Endpoints

#### Upload Photo

```
POST /api/photos
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
- file: <image file>

Response (201 Created):
{
  "id": 1,
  "url": "https://res.cloudinary.com/...",
  "description": "",
  "dateAdded": "2023-01-15T10:30:00",
  "isMain": false,
  "publicId": "cloudinary-public-id"
}
```

#### Set Main Photo

```
POST /api/photos/{photoId}/setMain
Authorization: Bearer {token}

Response (204 No Content)
```

#### Delete Photo

```
DELETE /api/photos/{photoId}
Authorization: Bearer {token}

Response (200 OK):
{
  "message": "Photo deleted successfully"
}
```

### Messages Endpoints

#### Get Messages

```
GET /api/messages?pageNumber=1&pageSize=10&messageContainer=Unread
Authorization: Bearer {token}

Query Parameters:
- pageNumber: Page number
- pageSize: Items per page
- messageContainer: 'Unread', 'Inbox', or 'Outbox'

Response (200 OK):
[
  {
    "id": 1,
    "senderId": 2,
    "senderKnownAs": "Jane",
    "senderPhotoUrl": "https://...",
    "recipientId": 1,
    "content": "Hey, how are you?",
    "isRead": false,
    "messageSent": "2023-01-15T10:30:00"
  }
]
```

#### Send Message

```
POST /api/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "recipientId": 2,
  "content": "Hi Jane, I'd like to connect!"
}

Response (201 Created):
{
  "id": 1,
  "senderId": 1,
  "senderKnownAs": "John",
  "senderPhotoUrl": "https://...",
  "recipientId": 2,
  "content": "Hi Jane, I'd like to connect!",
  "isRead": false,
  "messageSent": "2023-01-15T10:30:00"
}
```

---

## 📂 Project Structure

```
DatingApp/
├── DatingApp.API/                 # ASP.NET Core Backend
│   ├── Controllers/               # API Controllers
│   │   ├── AuthController.cs      # Authentication (register, login)
│   │   ├── UsersController.cs     # User profiles & likes
│   │   ├── PhotosController.cs    # Photo management
│   │   ├── MessagesController.cs  # Messaging
│   │   └── ...
│   ├── Models/                    # Database Models
│   │   ├── User.cs
│   │   ├── Photo.cs
│   │   ├── Like.cs
│   │   ├── Message.cs
│   │   └── ...
│   ├── Dtos/                      # Data Transfer Objects
│   │   ├── UserForLoginDto.cs
│   │   ├── UserForRegisterDto.cs
│   │   ├── UserForDetailsDto.cs
│   │   └── ...
│   ├── Data/                      # Data Access Layer
│   │   ├── DataContext.cs         # Entity Framework DbContext
│   │   ├── AuthRepository.cs      # Auth data operations
│   │   ├── DatingRepository.cs    # Dating features
│   │   └── Seed.cs                # Database seeding
│   ├── Helpers/                   # Utilities & Helpers
│   │   ├── AutoMapperProfiles.cs  # AutoMapper configuration
│   │   ├── Extensions.cs          # Extension methods
│   │   ├── CloudinarySettings.cs  # Cloudinary config
│   │   └── ...
│   ├── Migrations/                # Entity Framework Migrations
│   ├── Program.cs                 # Entry point
│   ├── Startup.cs                 # Dependency injection & middleware
│   └── appsettings.json           # Configuration
│
├── DatingApp-SPA/                 # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Angular components
│   │   │   ├── services/          # API services
│   │   │   ├── guards/            # Route guards
│   │   │   ├── interceptors/      # HTTP interceptors
│   │   │   ├── models/            # TypeScript interfaces
│   │   │   └── app.module.ts      # Root module
│   │   ├── environments/          # Environment configs
│   │   ├── index.html             # Main HTML
│   │   ├── styles.css             # Global styles
│   │   └── main.ts                # Bootstrap
│   ├── package.json               # Dependencies
│   ├── angular.json               # Angular CLI config
│   ├── tsconfig.json              # TypeScript config
│   └── karma.conf.js              # Test config
│
└── README.md                      # This file
```

---

## ✨ Key Features

### 1. User Authentication & Authorization

- JWT-based token authentication
- Secure password hashing (salt + hash)
- Token expiration (1 day)
- Auto-logout on token expiration

### 2. User Profiles

- Detailed profile information (age, gender, interests)
- Multiple photos with main photo selection
- Location-based information
- Profile completion percentage tracking

### 3. User Discovery

- Browse other user profiles
- Filter by gender, age range
- Pagination for performance
- Last active status tracking

### 4. Likes System

- Like/unlike other users
- View who liked your profile
- Prevent duplicate likes
- Mutual likes detection

### 5. Messaging

- Send and receive messages
- Message read/unread status
- Message pagination
- Filter: Unread, Inbox, Outbox

### 6. Photo Management

- Upload photos to Cloudinary
- Set main profile photo
- Delete photos
- Photo descriptions

### 7. Activity Tracking

- User last active timestamp
- Automatic update on API calls
- Sort by last active

---

## ⚙️ Configuration

### appsettings.json

#### JWT Token Configuration

```json
"AppSettings": {
  "Token": "your-very-long-secure-secret-key-min-32-chars-use-random-generator"
}
```

- **Production**: Use a strong, random 32+ character key
- **Never commit** actual token to version control

#### Database Connection String (SQLite)

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=datingapp.db"
}
```

- **Data Source=datingapp.db** → Creates/uses SQLite database file locally
- **No server required** → Works immediately without setup
- **Cross-platform** → Same setup on Windows, Mac, or Linux
- **File-based** → Database is a single `.db` file in the project folder

**Benefits of SQLite for development:**

- ✅ Zero configuration needed
- ✅ No external services to install
- ✅ Perfect for rapid prototyping and testing
- ✅ Easy to share projects (just commit the migrations, not the .db file)
- ✅ Can migrate to SQL Server later if needed

#### Cloudinary Configuration

Get your credentials from [Cloudinary Dashboard](https://cloudinary.com/console):

```json
"CloudinarySettings": {
  "CloudName": "your-cloud-name",
  "ApiKey": "your-api-key",
  "ApiSecret": "your-api-secret"
}
```

---

## 🐛 Troubleshooting

### Backend Issues

#### Error: "Cannot connect to database"

```
Solution:
1. Verify Entity Framework is installed: dotnet ef --version
2. Run migrations: dotnet ef database update
3. Check datingapp.db file exists in DatingApp.API folder
4. Delete datingapp.db and retry migrations to reset
```

#### Error: "Migrations failed"

```
Solution:
1. Delete database file: rm datingapp.db (or delete in Windows Explorer)
2. Re-run migrations: dotnet ef database update
3. Check for migration errors: dotnet ef migrations list
```

#### Error: "JWT token invalid/expired"

```
Solution:
1. Check token expiration time in AuthController
2. Verify token secret in appsettings.json matches Startup.cs
3. Ensure client sends token in Authorization header
4. Re-login to get new token
```

#### Error: "Cloudinary upload fails"

```
Solution:
1. Verify Cloudinary credentials in appsettings.json
2. Check Cloudinary account is active
3. Verify image file size < 10MB
4. Check supported formats (jpg, png, gif)
```

### Frontend Issues

#### Error: "Cannot find module '@angular/...'"

```
Solution:
1. Run: npm install
2. Delete node_modules and package-lock.json
3. Run: npm install again
4. Restart ng serve
```

#### Error: "404 Not found" when calling API

```
Solution:
1. Verify backend is running on http://localhost:5000
2. Check apiUrl in environment.ts
3. Verify CORS is enabled in Startup.cs
4. Check browser console for actual error
```

#### Error: "Unauthorized" on every request

```
Solution:
1. Ensure you're logged in first
2. Check token is stored in localStorage
3. Verify Authorization header format: "Bearer {token}"
4. Check token hasn't expired (1 day)
```

#### Error: "Photo upload fails"

```
Solution:
1. Verify file size < 10MB
2. Check file is image (jpg, png, gif)
3. Verify Cloudinary credentials
4. Check browser file upload logs
```

### Database Issues

#### Error: "Database already exists"

```
Solution:
1. Drop existing: dotnet ef database drop --force
2. Recreate: dotnet ef database update
```

#### Error: "Foreign key constraint fails"

```
Solution:
1. Delete data with constraints: DELETE FROM Likes; DELETE FROM Messages;
2. Or drop and recreate database
```

---

## 🔄 Development Workflow

### Using VS Code

1. **Open workspace**: `code .`
2. **Open integrated terminal**: Ctrl+`
3. **Run backend**:
   ```bash
   cd DatingApp.API
   dotnet watch run
   ```
4. **Open new terminal**: Ctrl+Shift+`
5. **Run frontend**:
   ```bash
   cd DatingApp-SPA
   npm start
   ```

### Using Visual Studio 2019

1. **Open solution**: Open `DatingApp.API/DatingApp.API.csproj`
2. **Build**: Ctrl+Shift+B
3. **Run**: F5 (launches on http://localhost:5000)

### Using Visual Studio Code with Extensions

Recommended extensions:

- C# (Microsoft)
- Angular Language Service
- ESLint
- Prettier
- REST Client
- Thunder Client

### Git Workflow

```bash
# Clone repository
git clone <repository-url>
cd DatingApp

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push and create pull request
git push origin feature/your-feature-name
```

### Building for Production

**Backend:**

```bash
cd DatingApp.API
dotnet publish -c Release -o ./publish
```

**Frontend:**

```bash
cd DatingApp-SPA
ng build --prod
```

---

## 📚 References

### Official Documentation

- [ASP.NET Core 2.2 Docs](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.2)
- [Angular 10 Docs](https://angular.io/docs)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [JWT.io](https://jwt.io/)

### Learning Resources

- **Course**: [Udemy - Build an App with ASPNET Core and Angular](https://www.udemy.com/share/101Wh2/) by Neil Cummings
- **SqlServer**: [SQL Server Tutorials](https://www.w3schools.com/sql/)
- **Bootstrap**: [Bootstrap 4 Docs](https://getbootstrap.com/docs/4.0/)

### Useful Tools

- **Postman**: [API Testing](https://www.postman.com/)
- **Thunder Client**: [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- **SQL Server Management Studio**: [Download SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)

---

## 👨‍💻 Development Tips

### Best Practices

1. **API**: Always use DTOs for request/response
2. **Frontend**: Use services for API calls, avoid direct HTTP calls in components
3. **Database**: Use migrations for schema changes, never modify directly
4. **Security**: Never commit sensitive data (tokens, connection strings)
5. **Code**: Follow naming conventions and keep functions small

### Performance Optimization

1. Enable pagination for large datasets
2. Lazy load images
3. Minify and bundle frontend assets
4. Use database indexes on frequently queried columns
5. Cache frequently accessed data

### Security Checklist

- [ ] Change default JWT token secret
- [ ] Update Cloudinary credentials
- [ ] Enable HTTPS in production
- [ ] Validate all user inputs
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Hash passwords (already implemented)

---

## 📞 Support & Contribution

For issues or contributions:

1. Check existing issues
2. Provide detailed error messages and logs
3. Include environment details (OS, .NET version, Node version)
4. Follow code style guidelines

---

## 📄 License

This project is for educational purposes.

---

## ✅ Quick Checklist Before Starting

- [ ] .NET Core SDK 2.2 installed
- [ ] ~~SQL Server installed~~ **Not needed! SQLite is embedded**
- [ ] Node.js v12+ installed
- [ ] Updated appsettings.json with JWT token
- [ ] Cloudinary account created (optional, for photo features)
- [ ] Run `dotnet ef database update` to create SQLite database
- [ ] Database file `datingapp.db` created
- [ ] Backend starts without errors: `dotnet run`
- [ ] Frontend npm packages installed: `npm install`
- [ ] Frontend compiles without errors: `npm start`
- [ ] Can login successfully at http://localhost:4200

---

**Thanks to Neil Cummings for the excellent Udemy course!**

**Happy Coding! 🚀👍😊**
