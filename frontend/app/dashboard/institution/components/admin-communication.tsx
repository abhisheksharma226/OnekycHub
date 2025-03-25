"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Paperclip, Send } from "lucide-react"

export default function AdminCommunication() {
  const [message, setMessage] = useState("")

  // Sample conversation data
  const conversations = [
    {
      id: "CONV-001",
      subject: "API Integration Issue",
      lastMessage: "We're looking into this issue and will get back to you shortly.",
      status: "open",
      updatedAt: "2023-07-15T14:30:00",
    },
    {
      id: "CONV-002",
      subject: "User Consent Management",
      lastMessage: "Thank you for your help. The issue has been resolved.",
      status: "closed",
      updatedAt: "2023-07-10T09:15:00",
    },
  ]

  // Sample messages for the first conversation
  const messages = [
    {
      id: "MSG-001",
      sender: "admin",
      senderName: "OneKYCHub Support",
      content: "Hello, how can we help you today?",
      timestamp: "2023-07-15T10:00:00",
    },
    {
      id: "MSG-002",
      sender: "user",
      senderName: "John Doe",
      content:
        "We're having issues with the API integration. When we try to fetch user data, we're getting a 403 error.",
      timestamp: "2023-07-15T10:05:00",
    },
    {
      id: "MSG-003",
      sender: "admin",
      senderName: "OneKYCHub Support",
      content:
        "I understand you're experiencing API integration issues. Could you please provide your API key ID and the specific endpoint you're trying to access?",
      timestamp: "2023-07-15T10:10:00",
    },
    {
      id: "MSG-004",
      sender: "user",
      senderName: "John Doe",
      content:
        "Our API key ID is API-789 and we're trying to access the /v1/users/{user_id} endpoint. The user has given consent but we still get the 403 error.",
      timestamp: "2023-07-15T10:15:00",
    },
    {
      id: "MSG-005",
      sender: "admin",
      senderName: "OneKYCHub Support",
      content: "We're looking into this issue and will get back to you shortly.",
      timestamp: "2023-07-15T10:20:00",
    },
  ]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Conversations list */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Search conversations..." className="bg-white border-gray-200" />

            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{conversation.subject}</h3>
                    <Badge
                      variant="outline"
                      className={
                        conversation.status === "open"
                          ? "bg-gray-100 text-black border-gray-200"
                          : "bg-gray-200 text-black border-gray-300"
                      }
                    >
                      {conversation.status === "open" ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatTimestamp(conversation.updatedAt)}</p>
                </div>
              ))}
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">New Conversation</Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat area */}
      <Card className="md:col-span-2 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>API Integration Issue</CardTitle>
            <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
              Open
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-0">
          <div className="flex flex-col p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user" ? "bg-gray-100 text-black" : "bg-black text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{msg.senderName}</span>
                    <span className="text-xs opacity-70">{formatTimestamp(msg.timestamp)}</span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Type your message..."
              className="flex-1 min-h-[80px] bg-white border-gray-200"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" className="border-gray-200">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

