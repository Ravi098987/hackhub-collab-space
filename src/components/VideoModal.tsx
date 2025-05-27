
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"

interface VideoModalProps {
  children: React.ReactNode
}

export function VideoModal({ children }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full bg-black/95 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            <span>HackHub Platform Demo</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          {/* Option 1: YouTube Embed */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual video ID
            title="HackHub Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
          
          {/* Option 2: Self-hosted video (uncomment if you prefer this)
          <video
            controls
            width="100%"
            height="100%"
            className="rounded-lg"
            poster="/path-to-your-video-thumbnail.jpg"
          >
            <source src="/path-to-your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */}
        </div>
        <div className="text-gray-300 text-sm mt-4">
          <p>This demo showcases the key features of HackHub:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Team formation and collaboration</li>
            <li>Real-time workspace and code editor</li>
            <li>Hackathon participation and management</li>
            <li>Project submission and judging</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
