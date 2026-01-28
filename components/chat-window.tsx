"use client"

import { forwardRef } from "react"
import ChatMessage from "./chat-message"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface ChatWindowProps {
  messages: Message[]
}

const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(({ messages }, ref) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={message.id} message={message} isFirst={index === 0} />
        ))}
        <div ref={ref} />
      </div>
    </div>
  )
})

ChatWindow.displayName = "ChatWindow"

export default ChatWindow
