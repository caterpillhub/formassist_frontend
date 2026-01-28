"use client"

import { useState, useRef, useEffect } from "react"
import ChatWindow from "@/components/chat-window"
import ChatInput from "@/components/chat-input"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import SettingsModal from "@/components/settings-modal"

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{
      id: string
      text: string
      sender: "user" | "assistant"
      timestamp: Date
      image?: string
    }>
  >([
    {
      id: "1",
      text: "Hello! I'm FormAssist, your AI government form assistant. I'm here to help you fill out any government forms accurately and efficiently. What form would you like help with today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])

  const [sidebarOpen, setSidebarOpen] = useState(false) // default to closed instead of true
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; date: string }>>([
    { id: "current", title: "Current Chat", date: "Today" },
  ])
  const [currentChatId, setCurrentChatId] = useState("current")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`
    setChatHistory((prev) => [{ id: newChatId, title: "New Chat", date: "Today" }, ...prev])
    setCurrentChatId(newChatId)
    setMessages([
      {
        id: "1",
        text: "Hello! I'm FormAssist, your AI government form assistant. I'm here to help you fill out any government forms accurately and efficiently. What form would you like help with today?",
        sender: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  const handleSendMessage = async (text: string, image?: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: "user" as const,
      timestamp: new Date(),
      ...(image && { image }),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: `I understand you need help with: "${text}". I can assist you by:\n\n1. Explaining what information you need to gather\n2. Guiding you through each section of the form\n3. Providing tips on common mistakes to avoid\n4. Ensuring all fields are filled correctly\n\nWhich section would you like to start with?`,
        sender: "assistant" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className={`flex flex-col h-screen bg-background ${theme === "dark" ? "dark" : ""}`}>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} onSettingsClick={() => setSettingsOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          onSelectChat={setCurrentChatId}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow messages={messages} ref={messagesEndRef} />
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </main>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
    </div>
  )
}
