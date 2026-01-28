"use client"

import { X, User, Moon, Sun, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  theme: "light" | "dark"
  onThemeChange: (theme: "light" | "dark") => void
}

export default function SettingsModal({ isOpen, onClose, theme, onThemeChange }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "about">("profile")

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border animate-slide-up pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-xl font-bold text-foreground">Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "preferences", label: "Preferences", icon: Sun },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium
                  transition-all duration-200 border-b-2
                  ${
                    activeTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {activeTab === "profile" && (
              <div className="space-y-4 animate-fade-in">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">User Profile</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-4 animate-fade-in">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Sun className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="font-medium text-foreground">Theme</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onThemeChange("light")}
                      className={`
                        px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          theme === "light"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      `}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => onThemeChange("dark")}
                      className={`
                        px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          theme === "dark"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      `}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Other preferences */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <span className="text-sm text-foreground">Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <span className="text-sm text-foreground">Auto-save chat history</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6 flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive flex-1 gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
