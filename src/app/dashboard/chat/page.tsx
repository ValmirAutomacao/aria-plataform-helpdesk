"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Rail } from "@/components/layout/rail"
import { ChatTimeline } from "@/components/chat/chat-timeline"
import { ContextSidebar } from "@/components/chat/context-sidebar"
import { InboxList } from "@/components/inbox/inbox-list"
import { useRealtimeChat } from "@/hooks/use-realtime-chat"
import { Phone, Users, FileText, MoreHorizontal, Zap, Paperclip, Smile, Mic, Brain, Send, Search, Filter, Bell, Plus, MessageSquare, Ticket } from "lucide-react"

// Componente simples para a Sidebar de navegação do dashboard (CRM menu)
function NavSidebar() {
  return (
    <aside className="w-[256px] bg-[var(--bg-1)] border-r border-[var(--line-1)] flex flex-col shrink-0">
      <div className="p-4 pb-0">
        <div className="flex items-center gap-3 p-3 bg-[var(--bg-2)] border border-[var(--line-1)] rounded-xl mb-6">
          <div className="w-8 h-8 bg-[var(--grad-violet)] rounded-lg flex items-center justify-center text-white font-bold">T</div>
          <div className="flex-1 overflow-hidden">
            <div className="text-[13px] font-semibold text-[var(--fg-0)] truncate">TechCorp Brasil</div>
            <div className="text-[11px] text-[var(--fg-3)] truncate font-mono">marina@techcorp.com.br</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4">
        <div className="mb-6">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-3)] px-2 mb-2">Atendimento</div>
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[var(--bg-3)] text-white shadow-[inset_0_0_0_1px_var(--line-2)] text-[13px] font-medium transition-colors">
              <MessageSquare className="w-4 h-4 text-[var(--v-500)]" /> Inbox ao vivo <span className="ml-auto text-[10px] bg-[var(--v-900)] text-[var(--v-200)] px-2 py-0.5 rounded-full font-semibold">14</span>
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)] text-[13px] font-medium transition-colors">
              <Ticket className="w-4 h-4" /> Tickets <span className="ml-auto text-[10px] bg-[var(--bg-3)] text-[var(--fg-2)] px-2 py-0.5 rounded-full font-semibold">8</span>
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)] text-[13px] font-medium transition-colors">
              <Brain className="w-4 h-4" /> Fila da IA <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
            </button>
          </nav>
        </div>
      </div>
    </aside>
  )
}

function ChatDashboard() {
  const searchParams = useSearchParams()
  const ticketId = searchParams.get("ticket") || "d4b3b1e3-231a-4c2f-b4b1-9b16854b7c10" // ticket mock for testing
  
  const { messages, isLoading, sendMessage } = useRealtimeChat(ticketId)
  const [composerText, setComposerText] = useState("")

  const handleSend = async () => {
    if (!composerText.trim()) return
    await sendMessage(composerText, "human")
    setComposerText("")
  }

  return (
    <div className="flex h-screen w-full bg-[var(--bg-1)] overflow-hidden">
      <Rail active="chat" />
      <NavSidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[var(--bg-0)] relative border-r border-[var(--line-1)]">
        <div className="h-[57px] flex items-center justify-between px-5 border-b border-[var(--line-1)] bg-[rgba(7,6,11,0.85)] backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 text-[13px] text-[var(--fg-2)]">
            <span>Inbox</span><span className="text-[var(--line-3)]">/</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--v-900)] text-[var(--v-200)] text-[12px] font-medium">
              <Phone className="w-3.5 h-3.5" /> WhatsApp
            </span>
            <span className="text-[var(--line-3)]">/</span>
            <span className="text-[var(--fg-0)] font-medium">Ana Beatriz Souza</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--ok-s)] text-[var(--ok)] text-[11px] font-medium ml-2 border border-[rgba(46,207,139,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" /> IA em execução
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[12px] font-medium text-[var(--fg-1)] transition-colors">
              <Users className="w-3.5 h-3.5" /> Transferir
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[12px] font-medium text-[var(--fg-1)] transition-colors">
              <FileText className="w-3.5 h-3.5" /> Criar ticket
            </button>
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-[var(--line-1)] text-[var(--fg-2)] transition-colors relative">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-[var(--fg-3)] text-sm">
            Carregando histórico do ticket...
          </div>
        ) : (
          <ChatTimeline messages={messages} />
        )}

        <div className="border-t border-[var(--line-1)] bg-[var(--bg-1)] p-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[11px] font-medium text-[var(--fg-1)] transition-colors">
              <Zap className="w-3 h-3 text-[var(--warn)]" /> Resposta rápida
            </button>
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[11px] font-medium text-[var(--fg-1)] transition-colors">
              <FileText className="w-3 h-3" /> Inserir artigo KB
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[11px] text-[var(--fg-3)] px-1">
            <Sparkles className="w-3.5 h-3.5 text-[var(--v-500)]" /> 
            <span>Use <code className="bg-[var(--bg-2)] border border-[var(--line-1)] px-1.5 py-0.5 rounded">/ia</code> para sugerir resposta · <code className="bg-[var(--bg-2)] border border-[var(--line-1)] px-1.5 py-0.5 rounded">@agente</code> para mencionar alguém da equipe</span>
          </div>

          <div className="relative rounded-xl border border-[var(--line-2)] bg-[var(--bg-0)] focus-within:border-[rgba(110,70,255,0.4)] focus-within:shadow-[0_0_0_2px_rgba(110,70,255,0.2)] transition-all flex flex-col">
            <textarea 
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              placeholder="Escreva uma mensagem ou deixe a ARIA continuar…"
              className="w-full bg-transparent text-[14px] text-[var(--fg-0)] placeholder:text-[var(--fg-3)] p-4 outline-none resize-none min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <div className="flex items-center justify-between p-2 border-t border-[var(--line-1)]">
              <div className="flex items-center gap-1">
                <button className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-[var(--line-1)] text-[var(--fg-2)] transition-colors"><Paperclip className="w-4 h-4" /></button>
                <button className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-[var(--line-1)] text-[var(--fg-2)] transition-colors"><Smile className="w-4 h-4" /></button>
                <button className="w-[32px] h-[32px] flex items-center justify-center rounded-lg hover:bg-[var(--line-1)] text-[var(--fg-2)] transition-colors"><Mic className="w-4 h-4" /></button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[12px] font-medium text-[var(--fg-1)] transition-colors ml-1">
                  <Brain className="w-3.5 h-3.5 text-[var(--v-500)]" /> Sugerir com IA
                </button>
              </div>
              <button 
                onClick={handleSend}
                disabled={!composerText.trim()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--grad-violet)] text-white text-[13px] font-semibold shadow-[0_4px_12px_rgba(110,70,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Enviar <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <ContextSidebar />
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg-1)] text-[var(--fg-3)]">
        Carregando ARIA Helpdesk...
      </div>
    }>
      <ChatDashboard />
    </Suspense>
  )
}

function Sparkles(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
}
