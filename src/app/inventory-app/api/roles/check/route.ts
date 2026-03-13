import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/inventory/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const path = searchParams.get('path');

    if (!role || !path) {
        return NextResponse.json({ allowed: false }, { status: 400 });
    }

    if (role?.toUpperCase() === 'ADMIN') {
        return NextResponse.json({ allowed: true }); // Admins always allowed
    }

    try {
        const searchRole = role.toUpperCase();
        const rp = await prisma.rolePermission.findUnique({ where: { role: searchRole } });
        if (!rp) {
            // Default rules if not set in DB
            if (path.startsWith('/inventory-app/settings')) return NextResponse.json({ allowed: false });
            return NextResponse.json({ allowed: true });
        }

        const perms = rp.permissions as Record<string, boolean>;

        let section = 'dashboard';
        if (path.startsWith('/inventory-app/products')) section = 'products';
        else if (path.startsWith('/inventory-app/invoices/new')) section = 'create_invoices';
        else if (path.startsWith('/inventory-app/invoices')) section = 'view_invoices';
        else if (path.startsWith('/inventory-app/analytics')) section = 'analytics';
        else if (path.startsWith('/inventory-app/settings')) section = 'settings';

        // Fallback: if old 'invoices' key exists in perms (migration), treat it as view_invoices
        if ((section === 'view_invoices' || section === 'create_invoices') && perms[section] === undefined && perms['invoices'] !== undefined) {
            return NextResponse.json({ allowed: perms['invoices'] === true });
        }

        return NextResponse.json({ allowed: perms[section] === true });
    } catch (error) {
        return NextResponse.json({ allowed: false }, { status: 500 });
    }
}
