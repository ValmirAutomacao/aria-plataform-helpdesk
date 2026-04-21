import React from "react"
import { Rail } from "./rail"
import { Sidebar } from "./sidebar"

interface AppShellProps {
  children: React.ReactNode
  activeRail?: "chat" | "tickets" | "kb" | "analytics" | "settings"
  activeSidebar?: "inbox" | "tickets" | "ai-queue" | "kb" | "training" | "analytics" | "team" | "settings" | "integrations"
  hasContextPanel?: boolean
}

export function AppShell({ 
  children, 
  activeRail = "chat",
  activeSidebar = "inbox",
  hasContextPanel = false
}: AppShellProps) {
  return (
    <div className={`app w-full min-h-[calc(100vh-57px)] grid bg-[var(--bg-1)] overflow-hidden relative ${hasContextPanel ? 'grid-cols-[72px_256px_1fr_340px] max-[1100px]:grid-cols-[72px_220px_1fr]' : 'grid-cols-[72px_256px_1fr]'} max-[860px]:grid-cols-[56px_1fr]`}>
      <Rail active={activeRail} />
      <Sidebar active={activeSidebar} />
      {/* Main Container */}
      <section className="main bg-[var(--bg-1)] flex flex-col min-w-0 overflow-hidden relative">
        {children}
      </section>
      {/* Opcional: Context Panel na 4ª coluna entra aqui se definido na page */}
    </div>
  )
}
