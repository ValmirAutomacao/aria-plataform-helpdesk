"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CoTStep {
  id: number
  label: string
  content: string
}

interface CoTPanelProps {
  steps: CoTStep[]
}

export function CoTPanel({ steps }: CoTPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-[var(--bg-2)] border border-[var(--line-1)] rounded-xl p-3 mb-4 w-full max-w-[540px] text-[13px] relative overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium text-[var(--fg-2)] mb-1 pb-2 border-b border-[var(--line-1)]"
      >
        <span className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[var(--v-500)]" />
          Chain of Thought — raciocínio da IA
        </span>
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-3 mt-3 overflow-hidden"
          >
            {steps.map((step) => (
              <div key={step.id} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-[var(--line-1)] flex items-center justify-center text-[10px] font-bold text-[var(--fg-3)] shrink-0 mt-0.5">
                  {step.id}
                </div>
                <div className="text-[var(--fg-2)]">
                  <span className="font-semibold text-[var(--fg-1)] mr-1">{step.label}:</span>
                  {step.content}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
