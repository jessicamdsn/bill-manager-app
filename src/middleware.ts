import { NextRequest, NextResponse } from "next/server"

const publicRoutes = [
  { path: '/register', whenAuthenticated: 'redirect' },
  // {path: '/pricing', whenAuthenticated: 'next'}, // caso o usuario possa acessar mesmo autenticado
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/register'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }
  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }
  if (authToken && !publicRoute) {
    // checar se o jwt n tá expirado
    //fazer decode da data de expiração do jwt
    // se sim, remover cookie e redirecionar o usuario pro login
    //aplicar uma estrátegia de refresh
    return NextResponse.next()
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}