"use server"

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Mensagens de erro traduzidas para o usuário
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.' }
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.' }
    }
    return { error: error.message }
  }

  // Redireciona para o dashboard após login bem-sucedido
  redirect('/dashboard/chat')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const companyName = formData.get('companyName') as string || 'Meu Workspace'

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios' }
  }

  if (password.length < 6) {
    return { error: 'A senha deve ter no mínimo 6 caracteres.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        company_name: companyName,
      },
    },
  })

  if (error) {
    if (error.message.includes('User already registered')) {
      return { error: 'Este e-mail já está cadastrado. Faça login ou redefina sua senha.' }
    }
    return { error: error.message }
  }

  // Redireciona para o dashboard após cadastro
  redirect('/dashboard/chat')
}
