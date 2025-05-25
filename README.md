# CourseCrafter AI

## About

**CourseCrafter AI** is an AI-powered platform that helps creators, educators, and businesses rapidly design and launch engaging online courses. With a modern authentication system, multi-factor security, and a user-friendly workflow, CourseCrafter AI streamlines the course creation process from idea to launch.

## Features
- **AI-Driven Course Generation**: Instantly generate course outlines, modules, and content using advanced AI.
- **Modern Authentication**: Secure sign up, login, password reset, email verification, and MFA.
- **User Dashboard**: Manage, edit, and customize your generated courses.
- **Accessibility & UX**: Responsive, accessible UI with keyboard navigation, ARIA, toasts, and loading states.
- **Security**: XSS/CSRF protection, httpOnly cookies, and robust error handling.

## How It Works

1. **Sign Up & Secure Access**
   - Users create an account with secure authentication (including email verification and optional multi-factor authentication).

2. **Course Generation**
   - Users describe their course idea, target audience, and goals.
   - The AI instantly generates a complete course outline, modules, and lesson plans tailored to the user's input.

3. **Customization & Management**
   - Users can review, edit, and personalize the generated course content.
   - The dashboard provides tools to manage courses, track progress, and prepare for launch.

4. **Launch & Delivery**
   - Courses can be exported or integrated with learning platforms (future roadmap).

## Who Is It For?
- Educators and trainers looking to save time on curriculum design.
- Entrepreneurs and businesses launching new learning products.
- Anyone who wants to turn expertise into structured, engaging courses quickly.

## Product Highlights
- **Fast:** Go from idea to ready-to-launch course in minutes.
- **Secure:** Modern authentication, MFA, and privacy-first design.
- **Accessible:** User-friendly, responsive, and accessible for all users.
- **Customizable:** AI does the heavy lifting, but you stay in control.

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Axios, React Hot Toast
- **Backend:** Node.js, Express, Firebase Admin SDK
- **Database:** Firebase Auth (users), (optionally extendable)

## Security
- Uses httpOnly cookies for tokens
- CSRF/XSS protection
- Secure password and email flows

## License
MIT
