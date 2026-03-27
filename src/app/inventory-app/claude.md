# Inventory Pro Module Instructions (`inventory-app`)

This module is the Admin Inventory Management System for the Build2Click project.

## Tech Stack & Architecture
- **Framework:** Next.js 16.1 (App Router)
- **UI & Styling:** React 19, Tailwind CSS 4, modular CSS (`page.module.css`), plain CSS (`inventory-globals.css`)
- **Database:** Prisma 5.22, Supabase
- **Icons:** `lucide-react`
- **Charts:** `recharts` for dashboard analytics
- **Notifications:** `sonner` for toast notifications

## Directory Structure
- `/src/app/inventory-app/layout.tsx`: The main shell for the admin layout, implementing the `AppShell` component and applying the `inventory-theme` class to `<body>`.
- **/inventory-app** routes:
  - `/` (Dashboard overview)
  - `/products` (Product listing)
  - `/products/add` (Adding new products)
  - `/inventory` (Stock levels/management)
  - `/invoices` (Invoice management)
  - `/analytics` (Reports and analytics)
  - `/settings` (Admin settings)
  - `/login` & `/unauthorized` (Auth & permissions)

## Development Conventions
1. **Routing:** Follow standard Next.js App Router rules (`page.tsx`, `layout.tsx`, `loading.tsx`).
2. **Server vs. Client Components:**
   - Use Server Components by default.
   - Use `"use client"` only when importing client-side hooks, state (`useState`, Zustand, etc.), or interactive libraries (e.g. `recharts`).
3. **Database Operations:** Use Server Actions or API routes for calling `PrismaClient`. Do not mix browser code with DB operations.
4. **Styling Guidelines:** 
   - Prefer Tailwind utility classes for new components.
   - For module-specific styles, use `page.module.css`.
   - Ensure the global admin aesthetic is maintained from the `inventory-globals.css` and `AppShell`.
5. **Icons:** Exclusively use `lucide-react`.

## Goals
Always prioritize responsive design and a clean, premium dashboard feel. When iterating on existing layouts, verify that table operations, forms, and analytical charts integrate seamlessly with the ongoing "Inventory Pro" aesthetic.
