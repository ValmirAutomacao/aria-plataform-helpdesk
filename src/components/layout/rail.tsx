import { Bell, Book, BarChart2, MessageSquare, Ticket, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface RailProps {
  active?: "chat" | "tickets" | "kb" | "analytics" | "settings"
}

export function Rail({ active = "chat" }: RailProps) {
  const items = [
    { id: "chat", icon: MessageSquare },
    { id: "tickets", icon: Ticket },
    { id: "kb", icon: Book },
    { id: "analytics", icon: BarChart2 },
    { id: "settings", icon: Settings },
  ]

  return (
    <aside className="rail flex flex-col items-center bg-[var(--bg-0)] border-r border-[var(--line-1)] py-[18px] gap-1.5 relative w-[72px] shrink-0">
      <div className="absolute top-0 right-[-1px] bottom-0 w-[1px] bg-grad-edge pointer-events-none"></div>
      
      <div className="rail-logo w-[42px] h-[42px] rounded-xl bg-grad-violet grid place-items-center text-white font-display font-bold text-xl shadow-[0_10px_30px_rgba(110,70,255,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] mb-3.5">
        A
      </div>

      {items.map((item) => {
        const isActive = item.id === active
        const Icon = item.icon
        return (
          <button
            key={item.id}
            className={cn(
              "rail-btn w-[42px] h-[42px] rounded-xl grid place-items-center text-[var(--fg-2)] transition-all duration-150 relative",
              "hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)]",
              isActive && "active bg-[var(--bg-3)] text-white shadow-[inset_0_0_0_1px_var(--line-2)]"
            )}
          >
            {isActive && (
              <div className="absolute left-[-12px] top-[10px] bottom-[10px] w-[3px] rounded-sm bg-grad-violet"></div>
            )}
            <Icon className="w-5 h-5" />
          </button>
        )
      })}

      <div className="rail-spacer flex-1"></div>

      <button className="rail-btn w-[42px] h-[42px] rounded-xl grid place-items-center text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)] transition-all">
        <Bell className="w-5 h-5" />
      </button>
      
      <div className="avatar w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#f4a5b8] to-[#b87a98] border-[1.5px] border-[var(--bg-1)]"></div>
    </aside>
  )
}
