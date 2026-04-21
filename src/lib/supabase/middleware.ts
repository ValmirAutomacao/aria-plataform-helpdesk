import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Primeiro define nos cookies do request (para componentes server-side)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Cria nova response com o request atualizado
          supabaseResponse = NextResponse.next({
            request,
          })
          // Depois define na response (para o browser receber os cookies)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: não adicionar lógica entre createServerClient e getUser
  // Isso pode invalidar a sessão de forma silenciosa
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname === '/login' || pathname.startsWith('/login')
  const isPublicAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon')

  if (isPublicAsset) {
    return supabaseResponse
  }

  // Se não estiver logado e tentar acessar rota protegida → redireciona pro login
  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Se estiver logado e tentar acessar o login → redireciona para o dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // CRÍTICO: retornar supabaseResponse (não NextResponse.next()) 
  // para garantir que os cookies de sessão sejam propagados ao browser
  return supabaseResponse
}
