# Build2Click - Project Instructions (`claude.md`)

This file provides comprehensive context and guidelines for AI agents working on the `build2click` project. The repository is a monorepo-style Next.js application containing multiple distinct modules (apps).

## Core Tech Stack (Global)
- **Framework:** Next.js 16.1 (App Router)
- **UI & Styling:** React 19, Tailwind CSS 4
- **Database:** Prisma 5.22
- **Backend/Auth:** Supabase

## Modules Architecture

The application is logically split into four main modules using Next.js route directories and route groups within `src/app`:

### 1. Inventory Pro (`/src/app/inventory-app`)
- **Role:** Admin Inventory Management System. Routes include `/inventory-app` (dashboard), `/inventory-app/products`, `/inventory-app/invoices`, etc.
- **Styling Guidelines:** Premium admin dashboard aesthetic (`inventory-globals.css`, `page.module.css`).
- **Key Dependencies:** `lucide-react` (icons), `recharts` (analytics charts), `sonner` (toast notifications).
- **Layout:** Rendered inside an `<AppShell>` configured in `src/app/inventory-app/layout.tsx`.

### 2. Agency App (`/src/app/(agency)`)
- **Role:** The main public-facing marketing and corporate website. Contains core pages like `/about`, `/contact`, and `/services` as well as the root landing page `/`.
- **Styling Guidelines:** Focuses on high-conversion, modern web design aesthetics suitable for a digital agency. Relies heavily on Tailwind utility classes and responsive styling.
- **Layout:** Configured via `src/app/(agency)/layout.tsx`. Does not affect URL paths due to the `(agency)` route group.

### 3. Digital Card App (`/src/app/(card)`)
- **Role:** Premium Digital Business Card application, specifically under the `/card` route.
- **Styling Guidelines:** Features very modern aesthetics (glassmorphism, tailored gradients, smooth micro-animations). Highly optimized for flawless mobile responsiveness. Uses a dedicated `globals.css` inside `(card)`.
- **Layout:** Configured via `src/app/(card)/layout.tsx`, completely isolating its high-end styling from the admin and agency apps.

### 4. Survey & Personality App (`/src/app/(survey)`)
- **Role:** An application for running surveys or personality tests (e.g., located at `/personality-app`).
- **Styling Guidelines:** Designed for interactive, user-friendly questionnaire flows with isolated CSS. Uses a dedicated `globals.css` within the `(survey)` route group.
- **Layout:** Configured via `src/app/(survey)/layout.tsx`.

## General AI Development Rules

1. **Routing Conventions:** Strictly adhere to the Next.js App Router paradigm. Pay close attention to which route group or directory you are working in, as layouts, metadata, and global styles vary heavily by module.
2. **Server vs Client Components:** 
   - Files are Server Components by default. 
   - Add `"use client"` only at the top of files that absolutely require browser APIs, state (`useState`), effect hooks, or handling DOM events.
3. **Data Fetching:** Fetch data on the server using Prisma Client inside Server Components or Server Actions (`"use server"`). Avoid exposing database logic to the client.
4. **Icons & Media:** Consistently use `lucide-react` for standard UI iconography across all modules.
5. **Separation of Concerns:** Avoid bleeding styles or logic between these four modules. Keep specific module code contained, and only extract extremely generic UI components to a shared `src/components` folder if they are genuinely reused across boundaries without theme conflicts.
