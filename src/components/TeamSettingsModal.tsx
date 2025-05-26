
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, UserMinus, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamSettingsModalProps {
  teamName: string
  teamDescription: string
  members: Array<{ name: string; role: string; avatar: string }>
  children: React.ReactNode
}

export function TeamSettingsModal({ teamName, teamDescription, members, children }: TeamSettingsModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(teamName)
  const [description, setDescription] = useState(teamDescription)
  const { toast } = useToast()

  const handleSave = () => {
    // TODO: Save to database
    console.log('Saving team settings:', { name, description })
    toast({
      title: "Settings saved!",
      description: "Team settings have been updated successfully.",
    })
    setOpen(false)
  }

  const handleRemoveMember = (memberName: string) => {
    // TODO: Remove member from team
    console.log('Removing member:', memberName)
    toast({
      title: "Member removed",
      description: `${memberName} has been removed from the team.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Team Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Team Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Team Members</Label>
              <Button size="sm" variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
            <div className="space-y-2">
              {members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  {member.role !== "Team Lead" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveMember(member.name)}
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gradient-bg">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
