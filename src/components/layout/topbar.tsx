import { Search, Filter, Plus, Bell, Users, FileText, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

interface TopbarProps {
  breadcrumbs: React.ReactNode
  actions?: React.ReactNode
}

export function Topbar({ breadcrumbs, actions }: TopbarProps) {
  return (
    <header className="topbar h-[56px] flex items-center gap-3 px-5 border-b border-[var(--line-1)] bg-[var(--bg-1)] shrink-0">
      <div className="crumbs flex items-center gap-2 text-[13px] text-[var(--fg-2)]">
        {breadcrumbs}
      </div>
      <div className="topbar-actions ml-auto flex items-center gap-2">
        {actions}
      </div>
    </header>
  )
}

// Sub-components para Actions da Topbar

export function TopbarIconButton({ icon: Icon, badge }: { icon: any; badge?: string | number }) {
  return (
    <button className="icon-btn w-[34px] h-[34px] rounded-[10px] grid place-items-center text-[var(--fg-2)] border border-[var(--line-1)] bg-[var(--bg-2)] transition-all duration-120 relative hover:text-[var(--fg-0)] hover:bg-[var(--bg-3)]">
      <Icon className="w-4 h-4" />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-[var(--v-500)] text-white text-[9px] font-bold py-0.5 px-1.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  )
}

export function TopbarChipButton({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) {
  return (
    <button className="chip-btn inline-flex items-center gap-1.5 py-1.5 px-3 rounded-[10px] text-[12px] font-medium text-[var(--fg-1)] border border-[var(--line-1)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)]">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </button>
  )
}

export function TopbarPrimaryButton({ icon: Icon, children }: { icon?: any; children: React.ReactNode }) {
  return (
    <button className="btn-primary inline-flex items-center gap-1.5 py-2 px-3.5 rounded-[10px] text-[13px] font-semibold text-white bg-grad-violet shadow-[0_6px_18px_rgba(110,70,255,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-[1px]">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </button>
  )
}
