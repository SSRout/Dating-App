# Backend API Documentation

## Overview

The DatingApp API is built with ASP.NET Core 2.2 and provides a RESTful service for the Angular frontend. It handles authentication, user management, messaging, and photo uploads.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [User Secrets Configuration](#user-secrets-configuration)
3. [Startup Configuration](#startup-configuration)
4. [Controllers](#controllers)
5. [Data Layer (Repositories)](#data-layer-repositories)
6. [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
7. [Database Models](#database-models)
8. [Authentication Flow](#authentication-flow)
9. [Error Handling](#error-handling)
10. [Extension Methods](#extension-methods)
11. [Adding New Features](#adding-new-features)

---

## Project Structure

The project structure is organized as follows:

- `Controllers/`: HTTP request handlers
  - `AuthController.cs`: Register, Login
  - `UsersController.cs`: Get users, profiles, likes
  - `PhotosController.cs`: Upload, set main, delete photos
  - `MessagesController.cs`: Send, receive messages
  - `ValuesController.cs`: Sample controller
  - `FallbackController.cs`: SPA fallback routing
- `Models/`: Database entities
  - `User.cs`: User entity with relationships
  - `Photo.cs`: User photos
  - `Like.cs`: User likes
  - `Message.cs`: Messages between users
  - `Value.cs`: Sample entity
- `Data/`: Data access layer
  - `DataContext.cs`: EF Core DbContext
  - `IAuthRepository.cs`: Auth repository interface
  - `AuthRepository.cs`: Auth implementation
  - `IDatingRepository.cs`: Dating repository interface
  - `DatingRepository.cs`: Dating implementation
  - `Seed.cs`: Database seeding
- `Dtos/`: Data transfer objects
  - `UserForLoginDto.cs`
  - `UserForRegisterDto.cs`
  - `UserForDetailsDto.cs`
  - `UserForListDto.cs`
  - `UserForUpdateDto.cs`
  - `PhotoForReturnDto.cs`
  - `PhotoForCreationDto.cs`
  - `MessageToReturnDto.cs`
  - `MessageForCreationDto.cs`
- `Helpers/`: Utilities and helpers
  - `AutoMapperProfiles.cs`: Mapping configuration
  - `Extensions.cs`: Extension methods
  - `CloudinarySettings.cs`: Cloudinary config class
  - `LogUserActivity.cs`: User activity middleware
  - `MessageParams.cs`: Message query parameters
  - `UserParams.cs`: User query parameters
  - `PagedList.cs`: Pagination helper
  - `PaginationHeader.cs`: Pagination header info
- `Migrations/`: EF Core migrations
- `Program.cs`: Application entry point
- `Startup.cs`: DI and middleware configuration
- `DatingApp.API.csproj`: Project file
- `appsettings.json`: Configuration
- `appsettings.Development.json`: Development configuration
- `user-secrets.json`: Local secrets (Git ignored)
- `datingapp.db`: SQLite database file

---

## 🛠 Technology Stack

### Backend Stack

- **Framework**: ASP.NET Core 2.2
- **Database**: SQLite 3 (file-based, embedded, no server required!)
- **ORM**: Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **Mapping**: AutoMapper
- **Photo Storage**: CloudinaryDotNet
- **API Style**: RESTful

### Key Features

- SQLite database (no SQL Server installation needed)
- Automatic database migrations on application startup
- Entity Framework Core for data access
- JWT token-based authentication
- AutoMapper for DTO mapping
- Cloudinary integration for photo uploads
- User Secrets for secure local configuration

---

## User Secrets Configuration

### Overview

The `user-secrets.json` file stores sensitive configuration data locally without committing it to version control. This file is **Git ignored** for security.

**Location:** `DatingApp.API/user-secrets.json`

### Setup Instructions

1. **Create the file:**

   Use the `dotnet user-secrets init` command in the DatingApp.API directory. This creates a `user-secrets.json` file in a secure location on your machine.

2. **Set secrets for Cloudinary:**

   Use the `dotnet user-secrets set` command to configure:
   - CloudinarySettings:CloudName
   - CloudinarySettings:ApiKey
   - CloudinarySettings:ApiSecret
   - AppSettings:Token

3. **Or manually edit the file:**

   You can directly edit the user-secrets.json file with the required keys and values.

### Cloudinary Setup

1. **Create a Cloudinary Account:**

   - Visit [cloudinary.com](https://cloudinary.com)
   - Sign up for a free account
   - Go to Dashboard to find your credentials

2. **Get Your Credentials:**

   - **Cloud Name:** Found on dashboard
   - **API Key:** Generate from API Keys section
   - **API Secret:** Generate from API Keys section (keep this secret!)

3. **Store in user-secrets.json:**

   Add your Cloud Name, API Key, and API Secret to the user-secrets.json file.

### JWT Secret Setup

The `AppSettings:Token` is used for signing JWT tokens in authentication.

1. **Generate a strong secret:**

   You can use any strong random string (minimum 16 characters recommended).

2. **Store in user-secrets.json:**

   Add your JWT secret key to the user-secrets.json file.

### Configuration Resolution Order (Precedence)

ASP.NET Core reads configuration in this order (later values override earlier):

1. `appsettings.json` (checked-in, public settings)
2. `appsettings.{Environment}.json` (e.g., Development, Production)
3. `user-secrets.json` (local, Git-ignored, overrides above)
4. Environment variables

**This means:** Secrets in `user-secrets.json` override `appsettings.json`

### How Secrets Are Used in Code

In `Startup.cs`, the configuration is used to:

- Configure Cloudinary settings from user-secrets.json
- Extract JWT token from user-secrets.json for token signing

### Security Notes

⚠️ **IMPORTANT:**

- **Never** commit `user-secrets.json` to Git (it's in `.gitignore`)
- **Never** share your API keys or secrets
- Each developer should have their own credentials
- On production, use secure configuration like Azure Key Vault or AWS Secrets Manager
- Environment variables should be used in CI/CD pipelines

### Viewing Secrets

Use the `dotnet user-secrets list` command to view all secrets in development, or `dotnet user-secrets remove` to remove specific secrets, or `dotnet user-secrets clear` to clear all secrets.

---

## Startup Configuration

### Program.cs

The Program.cs file is the application entry point. Key responsibilities include:

- Automatically runs Entity Framework migrations to create database schema
- Seeds the database with 10 test users from `Data/UserSeedData.json`
- Creates SQLite database file: `datingapp.db` in the project folder
- Logs any migration errors for debugging

**Database Creation Flow:**

1. Application starts
2. Creates scope for dependency injection
3. Gets DataContext from services
4. Runs database migrations - applies all pending migrations
5. Seeds the database - adds test users if database is empty
6. If any error occurs, logs it and continues (app still runs)

---

## Authentication Flow

The authentication process follows these steps:

1. **User Registration**
   - POST /api/auth/register
   - Validate username is unique
   - Hash password with salt
   - Save user to database
   - Return UserForDetailsDto

2. **User Login**
   - POST /api/auth/login
   - Find user by username
   - Verify password
   - Generate JWT token with NameIdentifier claim (User ID), Name claim (Username), and 1-day expiration
   - Return token and user info

3. **Subsequent Requests**
   - Client sends: Authorization: Bearer {token}
   - Middleware validates token
   - Extract claims from token
   - User ID available in controller

4. **Token Expiration**
   - After 24 hours, token becomes invalid
   - Client receives 401 Unauthorized
   - User must login again
   - New token issued

### Response Extensions

Response extension methods are available in Helpers/Extensions.cs for adding pagination headers to HTTP responses, including current page, items per page, total items, and total pages information.

---

## Adding New Features

### Example: Add a New API Endpoint

To add a new API endpoint, follow these steps:

1. **Add DTO** - Create a data transfer object class for the new feature

2. **Add Repository Method** - Define interface and implementation in the Data layer with appropriate async methods

3. **Register in Startup.cs** - Add service registration using AddScoped or appropriate lifetime

4. **Create Controller** - Add a new controller class with appropriate [Authorize], [Route], and [ApiController] attributes and action methods

5. **Add AutoMapper Profile** - Register mapping in Helpers/AutoMapperProfiles.cs using CreateMap

---

**Backend documentation complete. See README.md for frontend documentation.**
