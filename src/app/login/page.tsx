import { LoginVariantA } from "@/components/auth/login-a"
import { LoginVariantB } from "@/components/auth/login-b"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | ARIA Helpdesk",
  description: "Acesse ou crie sua workspace",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const { v } = await searchParams

  if (v === 'b') {
    return <LoginVariantB />
  }

  return <LoginVariantA />
}
