# Frontend Documentation - Angular 10 SPA

## Overview

The Dating App frontend is a Single Page Application (SPA) built with Angular 10. It provides a responsive, interactive user interface for browsing profiles, messaging, and managing user data.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup & Installation](#setup--installation)
3. [Common Tasks](#common-tasks)
4. [Deployment](#deployment)

---

## Project Structure

```
DatingApp-SPA/src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── navbar/
│   │   ├── home/
│   │   ├── member-list/     # Browse users
│   │   ├── member-detail/   # User profile
│   │   ├── member-edit/     # Edit profile
│   │   ├── member-card/
│   │   ├── photo-editor/    # Upload photos
│   │   ├── messages/        # Messaging UI
│   │   └── ...
│   ├── services/            # API communication
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── auth.guard.ts
│   │   ├── alertify.service.ts
│   │   └── ...
│   ├── models/              # TypeScript interfaces
│   │   ├── user.ts
│   │   ├── photo.ts
│   │   ├── message.ts
│   │   └── ...
│   ├── _guards/             # Route guards
│   │   └── auth.guard.ts
│   ├── _interceptors/       # HTTP interceptors
│   │   └── error.interceptor.ts
│   ├── app.module.ts        # Root module
│   ├── app.component.ts     # Root component
│   └── app-routing.module.ts
├── environments/            # Environment config
│   ├── environment.ts       # Dev
│   └── environment.prod.ts  # Production
├── index.html               # Main HTML
├── main.ts                  # Bootstrap
├── styles.css               # Global styles
└── polyfills.ts            # Browser compatibility
```

---

## Setup & Installation

### Prerequisites

```bash
# Check Node.js version (v12+)
node --version

# Check npm version (v6+)
npm --version

# If needed, install Angular CLI globally
npm install -g @angular/cli@10
```

### Installation Steps

```bash
cd DatingApp-SPA

# Install dependencies
npm install

# Start development server
npm start
# or: ng serve --open

# Access application
# http://localhost:4200
```

### Environment Configuration

#### Development (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:5000/api/",
};
```

#### Production (`src/environments/environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  apiUrl: "https://your-api-domain.com/api/",
};
```

### Build for Production

```bash
# Production build (optimized and minified)
npm run build

# or using ng command
ng build --prod

# Output files in dist/DatingApp-SPA/
```

---

## Common Tasks

### Add a New Component

```bash
# Generate component
ng generate component components/my-component

# or shorthand
ng g c components/my-component
```

This creates:

- `my-component.component.ts`
- `my-component.component.html`
- `my-component.component.css`
- `my-component.component.spec.ts`

### Add a New Service

```bash
# Generate service
ng generate service services/my-service

# or shorthand
ng g s services/my-service
```

## Deployment

### Build for Production

```bash
# Create optimized production build
ng build --prod

# Output in: dist/DatingApp-SPA/
```

### Deploy to Azure

```bash
# Login to Azure
az login

# Create app service
az appservice plan create --name myPlan --resource-group myGroup --sku B1 --is-linux

# Create web app
az webapp create --resource-group myGroup --plan myPlan --name myApp --runtime "Node|14"

# Deploy
npm run build
az webapp deployment source config-zip --resource-group myGroup --name myApp --src dist.zip
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist/DatingApp-SPA/
```

### Environment Variables

Never hardcode sensitive data. Use environment files:

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: process.env["API_URL"] || "https://api.example.com/api/",
};
```

---

## Useful Angular Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Operators](https://rxjs.dev/api)
- [Bootstrap Documentation](https://getbootstrap.com/docs/4.0/)

---

**Frontend documentation complete. For complete setup, see main README.md**
