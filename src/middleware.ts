import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'inventory-pro-secret-key-change-in-production-2024'
);

async function inventoryMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths in inventory app
    if (
        pathname.startsWith('/inventory-app/login') ||
        pathname.startsWith('/inventory-app/api/auth/login')
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get('auth_session')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/inventory-app/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const role = (payload.role as string)?.toUpperCase();

        if (role === 'ADMIN') return NextResponse.next();

        // Check restricted sections for non-admins
        // Simple path-based RBAC matching the logic in api/roles/check
        if (pathname.startsWith('/inventory-app/settings')) {
            // Staff/Managers might have limited access, but by default settings is restricted
            // In the original app, specific sub-paths like /settings/roles were further restricted
            return NextResponse.redirect(new URL('/inventory-app/unauthorized', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/inventory-app/login', request.url));
    }
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/inventory-app')) {
        return await inventoryMiddleware(request);
    }
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
