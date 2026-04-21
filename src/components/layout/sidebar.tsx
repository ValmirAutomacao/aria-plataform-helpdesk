import { MessageSquare, Ticket, Brain, Book, Sparkles, BarChart2, Users, Settings, Plug, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  active?: "inbox" | "tickets" | "ai-queue" | "kb" | "training" | "analytics" | "team" | "settings" | "integrations"
}

export function Sidebar({ active = "inbox" }: SidebarProps) {
  return (
    <aside className="side bg-[var(--bg-1)] border-r border-[var(--line-1)] flex flex-col overflow-hidden w-[256px] shrink-0">
      <div className="side-top p-[16px_14px_12px] border-b border-[var(--line-1)]">
        <div className="ws-card flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--bg-2)] border border-[var(--line-1)] cursor-pointer">
          <div className="ws-avatar w-8 h-8 rounded-lg bg-grad-violet grid place-items-center text-white font-bold text-sm shrink-0">
            T
          </div>
          <div className="ws-text min-w-0 flex-1">
            <div className="ws-name text-[13px] font-semibold text-[var(--fg-0)] whitespace-nowrap overflow-hidden text-ellipsis">
              TechCorp Brasil
            </div>
            <div className="ws-mail text-[11px] text-[var(--fg-3)] whitespace-nowrap overflow-hidden text-ellipsis font-mono">
              marina@techcorp.com.br
            </div>
          </div>
          <button className="ws-more text-[var(--fg-3)] p-0.5 rounded-md hover:bg-[var(--bg-3)]">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="nav-section p-[14px_10px_6px]">
          <div className="nav-label text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-3)] px-2 pb-2">Atendimento</div>
          <nav className="nav flex flex-col gap-0.5">
            <NavItem id="inbox" icon={MessageSquare} label="Inbox ao vivo" active={active} badge="14" />
            <NavItem id="tickets" icon={Ticket} label="Tickets" active={active} badge="8" />
            <NavItem id="ai-queue" icon={Brain} label="Fila da IA" active={active} dotOk />
          </nav>
        </div>

        <div className="nav-section p-[14px_10px_6px]">
          <div className="nav-label text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-3)] px-2 pb-2">Conhecimento</div>
          <nav className="nav flex flex-col gap-0.5">
            <NavItem id="kb" icon={Book} label="Base de artigos" active={active} />
            <NavItem id="training" icon={Sparkles} label="Treinar IA" active={active} />
          </nav>
        </div>

        <div className="nav-section p-[14px_10px_6px]">
          <div className="nav-label text-[10px] font-semibold tracking-widest uppercase text-[var(--fg-3)] px-2 pb-2">Insights</div>
          <nav className="nav flex flex-col gap-0.5">
            <NavItem id="analytics" icon={BarChart2} label="Analytics" active={active} />
            <NavItem id="team" icon={Users} label="Equipe" active={active} />
          </nav>
        </div>
      </div>

      <div className="side-bottom mt-auto p-2.5 border-t border-[var(--line-1)] flex flex-col gap-0.5">
        <NavItem id="settings" icon={Settings} label="Configurações" active={active} />
        <NavItem id="integrations" icon={Plug} label="Integrações" active={active} dotOk />
      </div>
    </aside>
  )
}

function NavItem({
  id,
  icon: Icon,
  label,
  active,
  badge,
  dotOk
}: {
  id: string
  icon: any
  label: string
  active: string
  badge?: string
  dotOk?: boolean
}) {
  const isActive = id === active
  return (
    <div
      className={cn(
        "nav-item flex items-center gap-2.5 p-[9px_12px] rounded-[10px] text-[var(--fg-2)] text-[13px] font-medium cursor-pointer transition-all duration-120",
        "hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)]",
        isActive && "active bg-[var(--bg-3)] text-white shadow-[inset_0_0_0_1px_var(--line-2)]"
      )}
    >
      <Icon className={cn("w-4 h-4 shrink-0 stroke-[1.8px]", isActive && "text-[var(--v-400)]")} />
      <span>{label}</span>
      {badge && (
        <span className="badge ml-auto text-[10px] py-0.5 px-[7px] rounded-full bg-[var(--v-900)] text-[var(--v-200)] font-semibold">
          {badge}
        </span>
      )}
      {dotOk && (
        <span className="dot-ok ml-auto w-[7px] h-[7px] rounded-full bg-[var(--ok)] shadow-[0_0_6px_var(--ok)]"></span>
      )}
    </div>
  )
}
