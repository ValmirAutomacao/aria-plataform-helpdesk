"use client"

import { useState, useTransition } from "react"
import { Mail, Lock, Eye, ArrowRight, Sparkles } from "lucide-react"
import { login, signup } from "@/app/login/actions"

export function LoginVariantB() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function onSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const res = isLogin ? await login(formData) : await signup(formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <div className="login-b-wrap min-h-[calc(100vh-57px)] relative flex items-center justify-center p-5 overflow-hidden">
      {/* Background animado B */}
      <div className="abs-bg absolute inset-0 bg-[#0A0A0A] z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(110,70,255,0.15)_0%,transparent_60%)] blur-[80px] pointer-events-none" />
      </div>

      <div className="login-b-card relative z-10 w-full max-w-[420px] bg-[rgba(255,255,255,0.03)] backdrop-blur-[30px] border border-[rgba(255,255,255,0.08)] p-10 rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="text-center mb-8">
          <div className="brand-dot mx-auto w-[46px] h-[46px] rounded-[14px] text-[22px] bg-grad-violet grid place-items-center text-white font-bold shadow-[0_8px_24px_rgba(110,70,255,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] mb-4">A</div>
          <h1 className="font-display text-[26px] font-semibold m-0 mb-1.5 text-white tracking-tight">
            {isLogin ? "Bem-vindo ao ARIA" : "Criar sua Workspace"}
          </h1>
          <p className="text-[14px] text-[rgba(255,255,255,0.6)] m-0">Acesse o painel operacional da sua equipe</p>
        </div>

        {error && (
          <div className="bg-[var(--bad-s)] text-[var(--bad)] text-xs p-3 rounded-lg border border-[var(--bad)] mb-4">
            {error}
          </div>
        )}

        <form action={onSubmit} className="login-b-form">
          {!isLogin && (
            <div className="field mb-4">
              <div className="input relative">
                <Sparkles className="w-[18px] h-[18px] text-[rgba(255,255,255,0.3)] absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" name="companyName" placeholder="Nome da sua Empresa" required className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-[42px] pr-4 h-[50px] text-[14px] text-white transition-all focus:border-[var(--v-500)] focus:bg-[rgba(255,255,255,0.08)] outline-none" />
              </div>
            </div>
          )}

          <div className="field mb-4">
            <div className="input relative">
              <Mail className="w-[18px] h-[18px] text-[rgba(255,255,255,0.3)] absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="email" name="email" defaultValue="admin@aria.com" placeholder="Seu e-mail" required className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-[42px] pr-4 h-[50px] text-[14px] text-white transition-all focus:border-[var(--v-500)] focus:bg-[rgba(255,255,255,0.08)] outline-none" />
            </div>
          </div>

          <div className="field mb-5">
            <div className="input relative">
              <Lock className="w-[18px] h-[18px] text-[rgba(255,255,255,0.3)] absolute left-4 top-1/2 -translate-y-1/2" />
              <input type="password" name="password" defaultValue="senha123" placeholder="Sua senha" required className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-[42px] pr-[42px] h-[50px] text-[14px] text-white transition-all focus:border-[var(--v-500)] focus:bg-[rgba(255,255,255,0.08)] outline-none" />
              <button type="button" className="tool-btn absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg grid place-items-center text-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="btn-primary w-full h-[50px] flex items-center justify-center text-[15px] rounded-[12px] font-semibold text-white bg-grad-violet shadow-[0_6px_20px_rgba(110,70,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-[1px] disabled:opacity-50"
          >
            {isPending ? 'Processando...' : (isLogin ? 'Acessar Plataforma' : 'Criar Conta')}
          </button>
        </form>

        <p className="login-foot text-center mt-6 text-[rgba(255,255,255,0.5)] text-[13px]">
          {isLogin ? "Primeira vez aqui? " : "Já possui conta? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-white font-medium hover:underline">
            {isLogin ? "Criar Workspace" : "Fazer Login"}
          </button>
        </p>
      </div>
    </div>
  )
}
