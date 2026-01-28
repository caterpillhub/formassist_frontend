"use client"

import { Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
  chatHistory: Array<{ id: string; title: string; date: string }>
  currentChatId: string
  onSelectChat: (id: string) => void
}

export default function Sidebar({
  isOpen,
  onClose,
  onNewChat,
  chatHistory,
  currentChatId,
  onSelectChat,
}: SidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
        absolute md:relative z-40 h-full bg-card border-r border-border flex flex-col 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0 md:w-0 md:border-0 pointer-events-none"}
      `}
      >
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Chat History</h2>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Button
            onClick={onNewChat}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 flex items-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            New Chat
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="group relative"
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
            >
              <button
                onClick={() => {
                  onSelectChat(chat.id)
                  onClose()
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all duration-200 animate-fade-in
                  ${
                    currentChatId === chat.id
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/50"
                  }
                `}
              >
                <p className="text-sm truncate">{chat.title}</p>
                <p className="text-xs text-muted-foreground">{chat.date}</p>
              </button>

              {/* Delete button on hover */}
              {hoveredChatId === chat.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 text-xs text-muted-foreground">
          <p>FormAssist v1.0</p>
        </div>
      </aside>
    </>
  )
}
