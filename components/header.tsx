"use client"

import { Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
  onSettingsClick: () => void
  sidebarOpen: boolean
}

export default function Header({ onMenuClick, onSettingsClick, sidebarOpen }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-muted transition-colors ${sidebarOpen ? "bg-muted" : ""}`}
            onClick={onMenuClick}
            title="Toggle chat history"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">FormAssist</h1>
            <p className="text-xs text-muted-foreground">AI Government Form Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-muted" onClick={onSettingsClick}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
