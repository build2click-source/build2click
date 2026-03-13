import { NextResponse } from 'next/server';
import prisma from '@/lib/inventory/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { discountPercent } = body;

        if (discountPercent === undefined || typeof discountPercent !== 'number') {
            return NextResponse.json({ error: 'Invalid discount percentage' }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id },
            data: { discountPercent },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Failed to update discount:', error);
        return NextResponse.json({ error: 'Failed to update discount' }, { status: 500 });
    }
}
