"use client"

import { Filter, Search, ArrowRight } from "lucide-react"

export function InboxList() {
  const convs = [
    { n: 'Ana B. Souza', p: 'pedido atrasado #BR-88421', pill: 'ok', pillClass: 'bg-[var(--ok-s)] text-[var(--ok)] border-[rgba(46,207,139,0.2)]', dotClass: 'bg-[var(--ok)]', st: 'IA · 94%', t: 'agora', ch: 'whatsapp' },
    { n: 'Rafael Nunes', p: 'cancelar assinatura Gold', pill: 'warn', pillClass: 'bg-[var(--warn-s)] text-[var(--warn)] border-[rgba(245,182,75,0.2)]', dotClass: 'bg-[var(--warn)]', st: 'Híbrido', t: '2m', ch: 'whatsapp' },
    { n: 'Camila Ferreira', p: 'produto chegou com defeito', pill: 'bad', pillClass: 'bg-[var(--bad-s)] text-[var(--bad)] border-[rgba(255,94,122,0.2)]', dotClass: 'bg-[var(--bad)]', st: 'Humano', t: '5m', ch: 'email' },
    { n: 'João P. Lima', p: 'como rastrear pedido?', pill: 'ok', pillClass: 'bg-[var(--ok-s)] text-[var(--ok)] border-[rgba(46,207,139,0.2)]', dotClass: 'bg-[var(--ok)]', st: 'IA · 98%', t: '7m', ch: 'chat' },
  ]

  return (
    <div className="bg-[var(--bg-1)] border border-[var(--line-1)] rounded-2xl overflow-hidden flex flex-col mt-4">
      <div className="p-4 flex items-center gap-3 border-b border-[var(--line-1)]">
        <h4 className="text-[14px] font-semibold text-[var(--fg-0)] m-0">Conversas ativas</h4>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--v-900)] text-[var(--v-200)] text-[10px] font-semibold">
          <span className="w-1 h-1 rounded-full bg-[var(--v-500)] shadow-[0_0_8px_var(--v-500)] animate-pulse" /> ao vivo
        </span>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[12px] font-medium text-[var(--fg-1)] transition-colors">
            <Filter className="w-3.5 h-3.5 text-[var(--fg-3)]" /> Todas
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[12px] font-medium text-[var(--fg-1)] transition-colors">
            <Search className="w-3.5 h-3.5 text-[var(--fg-3)]" /> Buscar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr>
              <th className="font-medium text-[11px] text-[var(--fg-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line-1)] bg-[var(--bg-2)]">Cliente</th>
              <th className="font-medium text-[11px] text-[var(--fg-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line-1)] bg-[var(--bg-2)]">Canal</th>
              <th className="font-medium text-[11px] text-[var(--fg-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line-1)] bg-[var(--bg-2)]">Última mensagem</th>
              <th className="font-medium text-[11px] text-[var(--fg-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line-1)] bg-[var(--bg-2)]">Estado</th>
              <th className="font-medium text-[11px] text-[var(--fg-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line-1)] bg-[var(--bg-2)] text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {convs.map((c, i) => (
              <tr key={i} className="border-b border-[var(--line-1)] hover:bg-[var(--bg-2)] transition-colors group cursor-pointer">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-3)] border border-[var(--line-1)] flex items-center justify-center font-bold text-[var(--fg-1)] text-[12px]">
                      {c.n.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-[var(--fg-0)]">{c.n}</div>
                      <div className="text-[10px] text-[var(--fg-3)]">{c.t} atrás</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--bg-2)] border border-[var(--line-1)] text-[var(--fg-2)] text-[10px] uppercase font-medium tracking-wider">
                    {c.ch}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--fg-2)] max-w-[280px] truncate">
                  {c.p}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${c.pillClass} text-[11px] font-semibold`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dotClass}`} /> {c.st}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[var(--fg-1)] hover:bg-[var(--bg-3)] transition-colors opacity-0 group-hover:opacity-100">
                    Abrir <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
