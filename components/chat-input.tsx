"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Send, Loader, Plus, X, Upload, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSendMessage: (message: string, image?: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageMenuOpen, setImageMenuOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setImageMenuOpen(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((input.trim() || selectedImage) && !isLoading) {
      onSendMessage(input.trim(), selectedImage || undefined)
      setInput("")
      setSelectedImage(null)
    }
  }

  return (
    <div className="border-t border-border bg-card">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected"
              className="max-h-24 rounded-lg border border-border"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setImageMenuOpen(!imageMenuOpen)}
              className="hover:bg-muted transition-colors"
              title="Add image"
            >
              <Plus className="w-5 h-5" />
            </Button>

            {imageMenuOpen && (
              <div className="absolute bottom-12 left-0 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 rounded-none hover:bg-muted text-sm flex items-center gap-2"
                  onClick={() => {
                    cameraInputRef.current?.click()
                  }}
                >
                  <Camera className="w-4 h-4" />
                  Take photo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 rounded-none hover:bg-muted text-sm flex items-center gap-2 border-t border-border"
                  onClick={() => {
                    fileInputRef.current?.click()
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Upload image
                </Button>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about any government form..."
            disabled={isLoading}
            className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <Button
            type="submit"
            disabled={isLoading || (!input.trim() && !selectedImage)}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            title="Send message"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          FormAssist can help with government form completion. Always verify information with official sources.
        </p>
      </div>
    </div>
  )
}
