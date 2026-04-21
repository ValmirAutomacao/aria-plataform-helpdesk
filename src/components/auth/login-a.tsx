"use client"

import { useState, useTransition } from "react"
import { Mail, Lock, Eye, Sparkles, ArrowRight } from "lucide-react"
import { login, signup } from "@/app/login/actions"

export function LoginVariantA() {
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
    <div className="login-wrap min-h-[calc(100vh-57px)] grid grid-cols-1 md:grid-cols-2 bg-[var(--bg-0)] relative overflow-hidden">
      {/* Esquerda - Visualização (Hero) */}
      <div className="login-vis hidden md:flex relative overflow-hidden bg-gradient-to-br from-[#1a0d3d] via-[#3d1a7a] to-[#6e46ff] flex-col justify-between p-12">
        <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_60%)] blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(92,196,255,0.4)_0%,transparent_55%)] blur-[80px] pointer-events-none" />
        
        <div className="login-vis-inner relative z-10 text-white flex flex-col gap-9">
          <div className="flex items-center gap-2.5">
            <div className="brand-dot w-10 h-10 rounded-xl bg-grad-violet grid place-items-center text-white font-bold text-lg shadow-[0_6px_20px_rgba(110,70,255,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]">A</div>
            <div className="font-display font-bold text-[22px]">ARIA</div>
          </div>
          <h2 className="font-display text-[34px] leading-[1.15] m-0 font-semibold tracking-tight max-w-[420px]">
            Atendimento com IA que pensa como seu melhor agente.
          </h2>
          <p className="m-0 text-[15px] opacity-85 max-w-[380px] leading-relaxed">
            Tickets resolvidos automaticamente, com CoT transparente e escalada inteligente quando precisa de humanos.
          </p>
        </div>

        <div className="vis-card relative z-10 bg-[rgba(255,255,255,0.08)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-2xl p-[18px] text-white max-w-[340px] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="vc-title text-[13px] opacity-80 mb-2.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> IA resolveu esta semana
          </div>
          <div className="vc-metric font-display text-[30px] font-semibold tracking-tight">3.284</div>
          <div className="vc-sub text-[12px] opacity-80 mt-1">↑ 42% vs. semana anterior · CSAT 4.7</div>
        </div>
      </div>

      {/* Direita - Formulário */}
      <div className="login-form-wrap flex items-center justify-center p-12 bg-[var(--bg-1)]">
        <form action={onSubmit} className="login-form w-full max-w-[400px]">
          <div className="sm-brand md:hidden flex items-center gap-2.5 mb-8">
            <div className="brand-dot w-[34px] h-[34px] rounded-[10px] text-[17px] bg-grad-violet grid place-items-center text-white font-bold">A</div>
            <span className="font-display font-bold text-xl text-white">ARIA</span>
          </div>
          
          <h1 className="font-display text-[30px] font-semibold m-0 mb-2 text-[var(--fg-0)] tracking-tight">
            {isLogin ? "Entrar na sua workspace" : "Criar sua workspace"}
          </h1>
          <p className="lead text-[14px] text-[var(--fg-2)] m-0 mb-7">
            Acesso exclusivo para agentes e gestores.
          </p>

          {error && (
            <div className="bg-[var(--bad-s)] text-[var(--bad)] text-xs p-3 rounded-lg border border-[var(--bad)] mb-4">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="field mb-3.5">
              <label className="block text-[12px] text-[var(--fg-2)] font-medium mb-1.5">Nome da Empresa</label>
              <div className="input flex items-center gap-2.5 bg-[var(--bg-2)] border border-[var(--line-2)] rounded-xl px-3.5 h-[46px] transition-all focus-within:border-[var(--v-500)] focus-within:shadow-ring-v">
                <Sparkles className="w-4 h-4 text-[var(--fg-3)] shrink-0" />
                <input type="text" name="companyName" placeholder="Ex: TechCorp" required className="flex-1 text-[14px] text-[var(--fg-0)] h-full bg-transparent border-0 outline-none" />
              </div>
            </div>
          )}

          <div className="field mb-3.5">
            <label className="block text-[12px] text-[var(--fg-2)] font-medium mb-1.5">E-mail corporativo</label>
            <div className="input flex items-center gap-2.5 bg-[var(--bg-2)] border border-[var(--line-2)] rounded-xl px-3.5 h-[46px] transition-all focus-within:border-[var(--v-500)] focus-within:shadow-ring-v">
              <Mail className="w-4 h-4 text-[var(--fg-3)] shrink-0" />
              <input type="email" name="email" defaultValue="marina@techcorp.com.br" placeholder="seu@empresa.com" required className="flex-1 text-[14px] text-[var(--fg-0)] h-full bg-transparent border-0 outline-none" />
            </div>
          </div>

          <div className="field mb-3.5">
            <label className="block text-[12px] text-[var(--fg-2)] font-medium mb-1.5">Senha</label>
            <div className="input flex items-center gap-2.5 bg-[var(--bg-2)] border border-[var(--line-2)] rounded-xl px-3.5 h-[46px] transition-all focus-within:border-[var(--v-500)] focus-within:shadow-ring-v">
              <Lock className="w-4 h-4 text-[var(--fg-3)] shrink-0" />
              <input type="password" name="password" defaultValue="senha123" placeholder="Sua senha" required className="flex-1 text-[14px] text-[var(--fg-0)] h-full bg-transparent border-0 outline-none" />
              <button type="button" className="tool-btn w-8 h-8 rounded-lg grid place-items-center text-[var(--fg-2)] hover:bg-[var(--bg-3)] hover:text-[var(--fg-1)]">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="field-row flex justify-between items-center mb-3.5 text-[12px]">
            <label className="check inline-flex items-center gap-[7px] text-[var(--fg-2)] cursor-pointer">
              <input type="checkbox" defaultChecked className="w-[15px] h-[15px] accent-[var(--v-500)]" /> Manter conectado
            </label>
            <a href="#" className="link text-[var(--v-400)] no-underline font-medium hover:underline">Esqueci a senha</a>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="btn-primary w-full p-[13px] justify-center text-[14px] mt-1.5 inline-flex items-center gap-1.5 rounded-[10px] font-semibold text-white bg-grad-violet shadow-[0_6px_18px_rgba(110,70,255,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-[1px] disabled:opacity-50"
          >
            {isPending ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')} <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="divider flex items-center gap-3 my-5 text-[var(--fg-3)] text-[11px] before:flex-1 before:h-[1px] before:bg-[var(--line-1)] after:flex-1 after:h-[1px] after:bg-[var(--line-1)]">
            ou {isLogin ? 'entre' : 'cadastre-se'} com
          </div>

          <div className="sso flex gap-2.5">
            <button type="button" className="sso-btn flex-1 flex items-center justify-center gap-2.5 p-[11px] bg-[var(--bg-2)] border border-[var(--line-2)] rounded-xl text-[13px] font-medium text-[var(--fg-1)] hover:bg-[var(--bg-3)]">
              Google
            </button>
            <button type="button" className="sso-btn flex-1 flex items-center justify-center gap-2.5 p-[11px] bg-[var(--bg-2)] border border-[var(--line-2)] rounded-xl text-[13px] font-medium text-[var(--fg-1)] hover:bg-[var(--bg-3)]">
              Microsoft
            </button>
          </div>

          <p className="login-foot text-center mt-5 text-[var(--fg-3)] text-[12px]">
            {isLogin ? "Ainda não tem acesso? " : "Já possui conta? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="link text-[var(--v-400)] no-underline font-medium hover:underline">
              {isLogin ? "Falar com o admin (ou Criar)" : "Fazer login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
