import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta comienza con /admin
  const isAdminRoute = pathname.startsWith("/admin")

  // No proteger la página de login
  const isLoginPage = pathname === "/admin/login"

  if (isAdminRoute && !isLoginPage) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Si no hay token, redirigir al login
    if (!token) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }

    // Verificar si el usuario es administrador
    if (!token.isAdmin) {
      // Si no es admin, redirigir a la página principal
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: ["/admin/:path*"],
}

