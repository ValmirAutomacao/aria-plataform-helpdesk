"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export interface ChatMessage {
  id: string
  role: "customer" | "ai" | "human"
  content: string
  timestamp: string
  senderName: string
  cotSteps?: { id: number; label: string; content: string }[]
}

export function useRealtimeChat(ticketId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!ticketId) return

    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          content,
          sender_type,
          created_at,
          users ( full_name )
        `)
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true })

      if (!error && data) {
        const formatted = data.map((msg: any) => ({
          id: msg.id,
          role: msg.sender_type,
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderName: msg.sender_type === "ai" ? "ARIA" : (msg.users?.full_name || "Cliente")
        }))
        setMessages(formatted)
      }
      setIsLoading(false)
    }

    fetchMessages()

    // 2. Subscribe to new inserts
    const channel = supabase
      .channel(`realtime-chat-${ticketId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `ticket_id=eq.${ticketId}`,
        },
        (payload) => {
          const newMsg = payload.new
          setMessages((prev) => [
            ...prev,
            {
              id: newMsg.id,
              role: newMsg.sender_type,
              content: newMsg.content,
              timestamp: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderName: newMsg.sender_type === "ai" ? "ARIA" : "Usuário" // In a real app we'd fetch the user's name or pass it in payload
            }
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [ticketId, supabase])

  const sendMessage = async (content: string, senderType: "customer" | "ai" | "human" = "human") => {
    const { data: userData } = await supabase.auth.getUser()
    const { data: profileData } = await supabase.from('users').select('tenant_id').eq('id', userData.user?.id).single()
    
    if (!profileData?.tenant_id) return

    await supabase.from("messages").insert({
      ticket_id: ticketId,
      tenant_id: profileData.tenant_id,
      content,
      sender_type: senderType,
      sender_id: userData.user?.id
    })
  }

  return { messages, isLoading, sendMessage }
}
