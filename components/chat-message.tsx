"use client"

interface ChatMessageProps {
  message: {
    id: string
    text: string
    sender: "user" | "assistant"
    timestamp: Date
    image?: string
  }
  isFirst?: boolean
}

export default function ChatMessage({ message, isFirst }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex animate-slide-up ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg lg:max-w-2xl rounded-2xl px-4 py-3 transition-all duration-300 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none shadow-md hover:shadow-lg"
            : "bg-card text-card-foreground border border-border rounded-bl-none shadow-sm"
        }`}
      >
        {message.image && (
          <img
            src={message.image || "/placeholder.svg"}
            alt="Message attachment"
            className="max-w-xs rounded-lg mb-2 border border-border/30"
          />
        )}
        <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
        <span className={`text-xs mt-1 block ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
