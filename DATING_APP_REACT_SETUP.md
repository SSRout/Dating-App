# DateMatch React App - Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd DatingApp-React
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This will start the app at `http://localhost:3000` with hot reload enabled.

### 3. Access the App

- Open `http://localhost:3000` in your browser
- Navigate to `/register` to create an account
- Or go to `/login` if you already have an account

### 4. Test Credentials

Use these seed user credentials to test the app:

| Username | Password     |
| -------- | ------------ |
| alia     | Password@123 |
| deepika  | Password@123 |
| reba     | Password@123 |
| anna     | Password@123 |
| ashley   | Password@123 |

**Example:**

```
Username: alia
Password: Password@123
```

> All seed users have display names and matching profiles in the database

## 📋 Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm run lint      # Check code quality with ESLint
npm run preview   # Preview production build locally
```

## 🔗 App Routes

| Route           | Description            | Auth Required |
| --------------- | ---------------------- | ------------- |
| `/`             | Home page              | No            |
| `/login`        | Login page             | No            |
| `/register`     | Registration page      | No            |
| `/members`      | Browse all members     | Yes           |
| `/members/:id`  | Member profile details | Yes           |
| `/members/edit` | Edit your profile      | Yes           |
| `/messages`     | Messaging interface    | Yes           |
| `/likes`        | People who liked you   | Yes           |

## 🎯 Default Features

### Home Page

- Hero section with call-to-action
- Feature highlights
- Quick access to login/register

### Authentication

- User registration with profile setup
- Login with email and password
- Secure token management
- Protected routes

### Browse Members

- Grid view of all members
- Search by name or city
- Pagination for browsing
- Quick like/message buttons
- Detailed member profiles

### Profile Management

- View your profile
- Edit profile information
- Upload photo via URL
- Add bio and interests

### Messaging

- View conversations
- List of recent messages
- Send/receive messages
- Message timestamps

### Likes

- See people who liked you
- Like back with one click
- Message liked users
- Remove from likes list

## 🎨 UI Highlights

- **Modern Neon Design**: Pink, cyan, purple, and lime neon colors
- **Dark Theme**: Sleek dark background with contrast
- **Responsive Layout**: Works beautifully on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and floating animations
- **Intuitive Navigation**: Clear navigation with mobile menu support

## ⚙️ Configuration

### Tailwind CSS

The app uses custom Tailwind configuration with:

- Dark mode enabled
- Custom color scheme
- Animation keyframes
- Gradient utilities
- Neon shadow effects

Located in: `tailwind.config.ts`

### TypeScript

Full TypeScript support with:

- Strict type checking
- React component typing
- Store type definitions

Located in: `tsconfig.json`

## 🔗 Backend API Connection

The frontend connects to:

```
API Base URL: http://localhost:5000/api
```

Make sure your backend API is running on this port.

### Required Backend Endpoints:

- Auth endpoints (login, register)
- Users endpoints (get members, update profile)
- Messages endpoints
- Likes endpoints

## 💡 Tips & Tricks

1. **Hot Reload**: Changes to files instantly reflect in the browser
2. **Component Reusability**: Use Tailwind classes for consistency
3. **Dark Mode**: Already enabled with dark colors
4. **Performance**: Production build is optimized and minified
5. **ESLint**: Run `npm run lint` to check code quality

## 🐳 Docker (Optional)

To run with Docker:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📱 Mobile Testing

The app is fully responsive. Test on mobile by:

1. Opening DevTools (F12)
2. Toggling device toolbar (Ctrl+Shift+M)
3. Testing on various screen sizes

## 🆘 Common Commands

```bash
# Clear node_modules and reinstall
rm -rf node_modules && npm install

# Clear npm cache
npm cache clean --force

# Update all dependencies
npm update

# Check for outdated packages
npm outdated
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)

## ✅ Verification Checklist

- [x] All pages created
- [x] Authentication working
- [x] Responsive design
- [x] Neon aesthetic applied
- [x] API integration ready
- [x] Components properly typed
- [x] Build succeeds
- [x] No ESLint errors
- [x] Navigation working
- [x] Error handling implemented

---

**Status**: ✅ Ready for Development

Last Updated: February 15, 2026
