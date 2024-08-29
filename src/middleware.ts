import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TypeScript expects 'string | undefined' as the type for 'token'
  const token = request.cookies.get('authToken' as any)

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.url) // Optional: add a callback URL to redirect after login
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/profile'] // Adjust to the routes you need
}
