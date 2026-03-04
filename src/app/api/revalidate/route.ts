import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/revalidate
// Called by the admin panel after any data change to instantly refresh SSR cache.
export async function POST(request: NextRequest) {
    try {
        const secret = request.headers.get('x-revalidate-secret');

        // Simple secret check to prevent abuse
        if (secret !== (process.env.REVALIDATION_SECRET || 'bbta-revalidate-2026')) {
            return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
        }

        // Revalidate entire site layout (all pages)
        revalidatePath('/', 'layout');

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message }, { status: 500 });
    }
}
