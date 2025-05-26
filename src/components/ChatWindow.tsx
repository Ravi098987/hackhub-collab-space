
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChatWindowProps {
  teamName: string
  children: React.ReactNode
}

export function ChatWindow({ teamName, children }: ChatWindowProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  // Mock chat messages - in real app this would come from database
  const [messages, setMessages] = useState([
    { id: 1, user: "Sarah", message: "Hey everyone! Ready for the hackathon?", time: "10:30 AM", avatar: "SS" },
    { id: 2, user: "Mike", message: "Absolutely! I've been working on the UI mockups.", time: "10:32 AM", avatar: "MJ" },
    { id: 3, user: "Lisa", message: "Great! I'll start on the backend APIs.", time: "10:35 AM", avatar: "LW" },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Add new message
    const newMessage = {
      id: messages.length + 1,
      user: "You",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: "YU"
    }
    
    setMessages([...messages, newMessage])
    setMessage("")
    
    toast({
      title: "Message sent!",
      description: `Your message was sent to ${teamName}`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {teamName} Chat
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Chat Messages */}
          <div className="max-h-64 overflow-y-auto space-y-3 p-2 border rounded-lg">
            {messages.map((chat) => (
              <div key={chat.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{chat.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{chat.user}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm break-words">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
