# ONGC Sahayog Welfare Trust Portal

The ONGC Sahayog Portal is a dedicated web application built to streamline the welfare assistance process for ONGC employees and contractors. The portal allows users to securely log in, verify their identity, and submit, track, and manage requests for various assistance programs provided by the trust.

## What it Does

- **Secure Two-Step Authentication:** Provides an integrated login flow that accepts ONGC Employee CPF numbers. The application validates identities against ONGC's LDAP Active Directory (for regular employees) or through the Bandhan API (for contractors). 
- **OTP Verification:** Implements robust second-factor authentication by sending an OTP verification code via SMS and registered email to guarantee secure application access before revealing private welfare information.
- **Request Management:** Empowers users to submit their required documentation, apply for specific welfare schemes, and visually track their request statuses through tailored dashboards.
- **Role-Based Access Control:** Differentiates the user experience and administrative capabilities between end-users (employees/contractors/requestors) and platform administrators/HR.

## Technology Stack

The project relies on a modern, monolithic architecture using the **TALL/VILT stack** concepts (Vue replaced by React). 

### Backend
- **Framework:** [Laravel](https://laravel.com/) (PHP 8.2+) - Serves as the robust foundation handling database operations, MVC patterns, APIs, and background queue jobs.
- **Authentication:** [Laravel Fortify](https://laravel.com/docs/fortify) - A headless authentication backend that handles default authentication processes natively.
- **Directory Integration:** `directorytree/ldaprecord-laravel` - To seamlessly bind and authenticate queries against ONGC's LDAP server.
- **Testing:** [PestPHP](https://pestphp.com/) configured for elegant backend testing.

### Frontend
- **Framework:** [React 19](https://react.dev/) with **TypeScript** - Used to craft highly interactive and dynamic user interfaces on the frontend.
- **Routing Bridge:** [Inertia.js](https://inertiajs.com/) - Replaces standard API routing by coupling Laravel routing tightly with React page rendering, essentially working as a classic monolith but driven by modern Javascript.
- **Component Design System:** Utilizing **Shadcn UI** (built on top of `@radix-ui` primitives) for accessible, consistent, and beautiful UI widgets like Buttons, Inputs, Dropdowns, and Dialogs.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for utility-first responsive styling and rapid UI creation.
- **Icons:** **Lucide React** used for crisp, scalable frontend iconography.
- **Bundler:** [Vite](https://vitejs.dev/) - Ensuring blazing fast local development servers and highly optimized production builds.

## Local Setup

Typically, the local runtime is supported by Laravel Sail, Laravel Herd, or Valet. Make sure your `.env` is comprehensively configured with valid Database, Mail Server (for OTPs), and LDAP/Bandhan credentials (`custom.use_custom_auth`). 

Start your server with:
```bash
composer install
npm install

# Run database migrations
php artisan migrate

# Run the frontend build and backend server concurrently
npm run dev
```
