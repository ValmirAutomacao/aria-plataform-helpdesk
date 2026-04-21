import { AppShell } from "@/components/layout/app-shell"
import { Topbar, TopbarChipButton, TopbarIconButton, TopbarPrimaryButton } from "@/components/layout/topbar"
import { Filter, Search, Plus, Bell } from "lucide-react"

export default function Home() {
  return (
    <AppShell activeRail="chat" activeSidebar="inbox">
      <Topbar 
        breadcrumbs={
          <>
            <span>Dashboard</span>
            <span className="sep">/</span>
            <span className="curr">Operação ao vivo</span>
          </>
        }
        actions={
          <>
            <TopbarChipButton icon={Filter}>Hoje · 00h–18h</TopbarChipButton>
            <TopbarIconButton icon={Bell} badge="3" />
            <TopbarPrimaryButton icon={Plus}>Nova conversa</TopbarPrimaryButton>
          </>
        }
      />
      
      <div className="p-5">
        <h1 className="text-[var(--fg-0)] text-xl font-display font-semibold">
          Bem-vindo ao ARIA Helpdesk
        </h1>
        <p className="text-[var(--fg-3)] mt-2">
          Interface fundacional conectada ao App Shell com sucesso.
        </p>
      </div>
    </AppShell>
  )
}
