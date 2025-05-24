
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, MessageCircle, Code, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { CreateTeamModal } from "@/components/CreateTeamModal"
import { useToast } from "@/hooks/use-toast"

export default function Teams() {
  const { toast } = useToast()

  const handleJoinRequest = (teamName: string) => {
    // TODO: Integrate with Supabase
    console.log('Requesting to join:', teamName)
    toast({
      title: "Request Sent!",
      description: `Your request to join ${teamName} has been sent.`,
    })
  }

  const myTeams = [
    {
      id: 1,
      name: "Team Alpha",
      description: "Building an AI-powered chatbot for customer service",
      members: [
        { name: "John Doe", role: "Team Lead", avatar: "JD" },
        { name: "Sarah Smith", role: "Developer", avatar: "SS" },
        { name: "Mike Johnson", role: "Designer", avatar: "MJ" },
        { name: "Lisa Wang", role: "Developer", avatar: "LW" },
      ],
      hackathon: "AI Innovation Challenge",
      status: "active",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Code Warriors",
      description: "E-commerce platform with sustainable focus",
      members: [
        { name: "John Doe", role: "Developer", avatar: "JD" },
        { name: "Alex Chen", role: "Team Lead", avatar: "AC" },
        { name: "Emma Davis", role: "Designer", avatar: "ED" },
      ],
      hackathon: "Green Tech Hackathon",
      status: "active",
      lastActivity: "1 day ago"
    }
  ]

  const availableTeams = [
    {
      id: 3,
      name: "Health Hackers",
      description: "Creating a mental health tracking app",
      membersCount: 3,
      maxMembers: 5,
      hackathon: "Health Innovation Challenge",
      skills: ["React", "Node.js", "MongoDB"],
      lookingFor: "UI/UX Designer"
    },
    {
      id: 4,
      name: "FinTech Innovators",
      description: "Building a blockchain-based payment solution",
      membersCount: 2,
      maxMembers: 4,
      hackathon: "FinTech Revolution",
      skills: ["Blockchain", "Smart Contracts", "React"],
      lookingFor: "Full Stack Developer"
    }
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and find new collaboration opportunities</p>
        </div>
        <CreateTeamModal />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search teams..." className="pl-10" />
      </div>

      {/* My Teams */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Teams</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {team.name}
                      <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                        {team.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/workspace">
                      <Button size="sm" variant="outline">
                        <Code className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Hackathon</p>
                    <Badge variant="outline">{team.hackathon}</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Team Members</p>
                    <div className="flex items-center gap-2">
                      {team.members.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="hidden sm:block">
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Last activity: {team.lastActivity}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Link to="/workspace">
                        <Button size="sm" className="gradient-bg">
                          Open Workspace
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Teams */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Teams Looking for Members</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{team.membersCount}/{team.maxMembers} members</span>
                    </div>
                    <Badge variant="outline">{team.hackathon}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Looking for:</p>
                    <Badge>{team.lookingFor}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-1">
                      {team.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-bg"
                    onClick={() => handleJoinRequest(team.name)}
                  >
                    Request to Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
