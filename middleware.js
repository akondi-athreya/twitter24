import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;
    
    // Define public paths that don't require authentication
    const isPublicPath = 
        path === '/sign-in' || 
        path === '/sign-up' || 
        path === '/forgot-password' || 
        path.startsWith('/forgot-password');
    
    // Check if the path is for static assets (which should always be accessible)
    const isAssetPath = 
        path.startsWith('/assets/') || 
        path.startsWith('/_next/') || 
        path.includes('/public/') ||
        path.includes('.svg') ||
        path.includes('.jpg') ||
        path.includes('.png') ||
        path.includes('.css') ||
        path.includes('.ico');
    
    // Check if user is authenticated by looking for the auth cookie
    const isAuthenticated = request.cookies.get('auth')?.value;

    // If it's an asset path, always allow access
    if (isAssetPath) {
        return NextResponse.next();
    }

    // If the user is not authenticated and trying to access a protected route
    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // If the user is authenticated and trying to access login/register page
    if (isAuthenticated && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Update the matcher to explicitly exclude static assets
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /fonts, /assets (static files)
         * 4. all root files inside public (robots.txt, favicon.ico, etc.)
         */
        '/((?!api|_next|assets|fonts|public|favicon.ico).*)',
        '/sign-in',
        '/sign-up',
        '/forgot-password'
    ],
};