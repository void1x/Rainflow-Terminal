# Authentication Setup Guide

## Overview
This project uses Google OAuth for authentication with email/password fallback option.

## Features
- **Email/Password Registration & Login**: Simple local authentication
- **Google OAuth Sign-in/Sign-up**: One-click authentication with Google
- **Protected Routes**: Dashboard and app features require authentication
- **User Profile**: Display user info from Google or email signup
- **Logout**: Sign out functionality in navbar

## Setup Instructions

### 1. Configure Google OAuth

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Rainflow Terminal")
5. Click "CREATE"

#### Step 2: Enable Google+ API
1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "ENABLE"

#### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in the app name and your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users if needed
4. Back to OAuth client ID creation:
   - Select "Web application" as application type
   - Name it "Rainflow Terminal"
   - Add Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `http://localhost:3000` (alternative)
   - Click "CREATE"

#### Step 4: Copy Your Client ID
1. Copy the Client ID from the credentials page
2. Create a `.env.local` file in the project root:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
   ```

### 2. Environment Setup

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Google Client ID
# REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
```

### 3. Test the Setup

```bash
# Start the development server
npm run dev

# Visit http://localhost:5173
# You should see the Login page
```

## Usage

### Routes
- `/login` - Login page (email or Google OAuth)
- `/signup` - Sign up page (email or Google OAuth)
- `/` - Protected dashboard (redirects to login if not authenticated)

### Authentication Flow
1. Unauthenticated users are redirected to `/login`
2. Users can sign in with:
   - Email and password (stored in localStorage)
   - Google OAuth (secure token-based)
3. User data is stored in localStorage as JSON
4. Authenticated users can access the dashboard
5. Click the user menu in navbar to sign out

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx       # Login page with email & Google OAuth
│   │   ├── Signup.jsx      # Sign up page with email & Google OAuth
│   │   └── PrivateRoute.jsx # Route protection component
│   ├── Navbar.jsx          # Updated with user menu & logout
│   └── ... (other components)
├── App.jsx                 # Updated with auth routes & GoogleOAuthProvider
└── ... (other files)
```

## Security Notes

⚠️ **Development Only**: This implementation stores user data in localStorage for demo purposes. For production:

1. Implement a backend API for authentication
2. Use secure HTTP-only cookies for tokens
3. Never store sensitive data in localStorage
4. Implement proper JWT token validation
5. Add CSRF protection
6. Use HTTPS only in production
7. Implement rate limiting on auth endpoints

## Troubleshooting

### Google OAuth not showing
- Check that `REACT_APP_GOOGLE_CLIENT_ID` is set in `.env.local`
- Verify the Client ID is correct in Google Cloud Console
- Ensure `http://localhost:5173` is in Authorized JavaScript origins

### Login not working
- Check browser console for errors
- Verify localStorage is enabled
- Check network tab in DevTools for API calls

### Redirect loops
- Clear localStorage and try again
- Check PrivateRoute logic
- Verify user data format in localStorage

## Future Enhancements

1. Add email verification
2. Implement password reset
3. Add GitHub OAuth
4. Add 2FA support
5. Implement proper backend authentication
6. Add user profile management
7. Add session timeout
