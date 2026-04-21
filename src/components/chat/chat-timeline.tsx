"use client"

import { CoTPanel } from "./cot-panel"

interface Message {
  id: string
  role: "customer" | "ai" | "human"
  content: string
  timestamp: string
  senderName: string
  isActionable?: boolean
  cotSteps?: { id: number; label: string; content: string }[]
}

interface ChatTimelineProps {
  messages: Message[]
}

export function ChatTimeline({ messages }: ChatTimelineProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[var(--bg-0)]">
      <div className="text-center text-[12px] text-[var(--fg-3)] font-medium my-4">
        hoje, 14:02
      </div>

      {messages.map((msg) => {
        const isThem = msg.role === "customer"
        
        return (
          <div key={msg.id} className={`flex flex-col gap-1 ${isThem ? "items-start" : "items-end"}`}>
            <div className="flex items-center gap-2 text-[11px] text-[var(--fg-3)] mb-1">
              {isThem && (
                <div className="w-5 h-5 rounded-md bg-[var(--bg-3)] border border-[var(--line-1)] flex items-center justify-center font-bold text-[10px]">
                  {msg.senderName.charAt(0)}
                </div>
              )}
              {isThem ? (
                <>
                  {msg.senderName} <span className="mx-1">·</span> cliente <span className="mx-1">·</span> {msg.timestamp}
                </>
              ) : (
                <>
                  {msg.senderName} <span className="mx-1">·</span> {msg.timestamp}
                </>
              )}
            </div>

            {msg.cotSteps && msg.cotSteps.length > 0 && !isThem && (
              <CoTPanel steps={msg.cotSteps} />
            )}

            <div 
              className={`relative px-4 py-3 rounded-2xl text-[13px] leading-relaxed max-w-[540px]
                ${isThem 
                  ? "bg-[var(--bg-2)] border border-[var(--line-1)] text-[var(--fg-1)] rounded-tl-sm" 
                  : "bg-[var(--bg-3)] border border-[var(--v-900)] text-[var(--fg-0)] rounded-tr-sm"
                }
              `}
            >
              {msg.role === "ai" && (
                <div className="absolute -top-2 left-3 bg-[var(--grad-violet)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wider uppercase">
                  AI
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
