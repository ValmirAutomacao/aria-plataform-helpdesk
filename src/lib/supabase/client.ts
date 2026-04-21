import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl.includes('/rest/v1') || supabaseUrl.includes('/auth/v1')) {
  throw new Error(
    `NEXT_PUBLIC_SUPABASE_URL inválida: "${supabaseUrl}". ` +
    'Use apenas o domínio base, ex: https://SEU_ID.supabase.co'
  )
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY não configurada.')
}

export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}
