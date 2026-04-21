"use client"

import { Pin, Ticket, Sparkles } from "lucide-react"

export function ContextSidebar() {
  return (
    <aside className="w-[340px] bg-[var(--bg-1)] border-l border-[var(--line-1)] flex flex-col shrink-0">
      <div className="p-6 pb-0 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-3)] border border-[var(--line-2)] flex items-center justify-center text-xl font-bold text-[var(--fg-1)] mb-3">
          A
        </div>
        <div className="text-[16px] font-semibold text-[var(--fg-0)] mb-1">
          Ana Beatriz Souza
        </div>
        <div className="text-[13px] text-[var(--fg-3)] font-mono mb-4">
          ana.souza@gmail.com
        </div>
        <div className="flex gap-2 justify-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--ok-s)] text-[var(--ok)] text-[11px] font-semibold border border-[rgba(46,207,139,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
            VIP
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-2)] border border-[var(--line-1)] text-[var(--fg-2)] text-[11px] font-medium">
            5 pedidos
          </span>
        </div>
      </div>

      <div className="flex px-4 mt-6 border-b border-[var(--line-1)]">
        <button className="flex-1 pb-3 text-[13px] font-semibold text-[var(--fg-0)] border-b-2 border-[var(--v-500)] text-center relative -mb-[1px]">
          Perfil
        </button>
        <button className="flex-1 pb-3 text-[13px] font-medium text-[var(--fg-3)] hover:text-[var(--fg-2)] text-center border-b-2 border-transparent transition-colors">
          Histórico
        </button>
        <button className="flex-1 pb-3 text-[13px] font-medium text-[var(--fg-3)] hover:text-[var(--fg-2)] text-center border-b-2 border-transparent transition-colors">
          Notas
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Card: Contato */}
        <div className="bg-[var(--bg-2)] border border-[var(--line-1)] rounded-xl p-4 flex flex-col gap-3">
          <h5 className="flex items-center gap-2 text-[13px] font-semibold text-[var(--fg-1)] m-0">
            <Pin className="w-4 h-4 text-[var(--fg-3)]" /> Contato
          </h5>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">Telefone</span>
            <span className="text-[var(--fg-1)]">+55 11 9 8876-5432</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">E-mail</span>
            <span className="text-[var(--fg-1)] truncate max-w-[140px]">ana.souza@gmail.com</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">Cidade</span>
            <span className="text-[var(--fg-1)]">São Paulo / SP</span>
          </div>
        </div>

        {/* Card: Pedido Atual */}
        <div className="bg-[var(--bg-2)] border border-[var(--line-1)] rounded-xl p-4 flex flex-col gap-3">
          <h5 className="flex items-center gap-2 text-[13px] font-semibold text-[var(--fg-1)] m-0">
            <Ticket className="w-4 h-4 text-[var(--fg-3)]" /> Pedido atual
          </h5>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">Número</span>
            <span className="font-mono text-[var(--v-400)] font-medium">#BR-88421</span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">Status</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--warn-s)] text-[var(--warn)] font-medium text-[10px]">
              <span className="w-1 h-1 rounded-full bg-[var(--warn)]" /> em trânsito
            </span>
          </div>
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-[var(--fg-3)]">Valor</span>
            <span className="text-[var(--fg-1)]">R$ 348,90</span>
          </div>
        </div>

        {/* Card: Sugestões da IA */}
        <div className="bg-[var(--bg-2)] border border-[var(--line-1)] rounded-xl p-4 flex flex-col gap-3">
          <h5 className="flex items-center gap-2 text-[13px] font-semibold text-[var(--fg-1)] m-0">
            <Sparkles className="w-4 h-4 text-[var(--v-500)]" /> Sugestões da IA
          </h5>
          <div className="flex flex-col gap-2">
            <button className="text-left px-3 py-2 rounded-lg bg-[var(--bg-1)] border border-[var(--line-1)] hover:border-[var(--line-2)] text-[12px] text-[var(--fg-1)] transition-colors">
              Oferecer frete grátis próximo pedido
            </button>
            <button className="text-left px-3 py-2 rounded-lg bg-[var(--bg-1)] border border-[var(--line-1)] hover:border-[var(--line-2)] text-[12px] text-[var(--fg-1)] transition-colors">
              Enviar pesquisa CSAT ao finalizar
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
