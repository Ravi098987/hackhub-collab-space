
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CreateTeamModal() {
  const [open, setOpen] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [description, setDescription] = useState("")
  const [hackathon, setHackathon] = useState("")
  const [maxMembers, setMaxMembers] = useState("4")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const hackathons = [
    "AI Innovation Challenge",
    "Green Tech Hackathon", 
    "FinTech Revolution",
    "Health Innovation Challenge"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!teamName.trim() || !hackathon) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Creating team:', { teamName, description, hackathon, maxMembers })
    
    toast({
      title: "Team Created!",
      description: `${teamName} has been successfully created.`,
    })
    
    setOpen(false)
    setIsLoading(false)
    
    // Reset form
    setTeamName("")
    setDescription("")
    setHackathon("")
    setMaxMembers("4")
  }

  const handleCancel = () => {
    setOpen(false)
    // Reset form
    setTeamName("")
    setDescription("")
    setHackathon("")
    setMaxMembers("4")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg">
          <Plus className="w-4 h-4 mr-2" />
          Create New Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="teamName">Team Name *</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your team and project idea..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="hackathon">Select Hackathon *</Label>
            <Select 
              value={hackathon} 
              onValueChange={setHackathon} 
              required
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a hackathon" />
              </SelectTrigger>
              <SelectContent>
                {hackathons.map((h) => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Select 
              value={maxMembers} 
              onValueChange={setMaxMembers}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 members</SelectItem>
                <SelectItem value="4">4 members</SelectItem>
                <SelectItem value="5">5 members</SelectItem>
                <SelectItem value="6">6 members</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="gradient-bg"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
