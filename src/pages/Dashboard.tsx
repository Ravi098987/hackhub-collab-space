import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Trophy, Code, Plus, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { CreateTeamModal } from "@/components/CreateTeamModal"

export default function Dashboard() {
  const stats = [
    { title: "Active Teams", value: "3", icon: Users, color: "text-blue-500" },
    { title: "Ongoing Hackathons", value: "2", icon: Trophy, color: "text-purple-500" },
    { title: "Projects Submitted", value: "7", icon: Code, color: "text-green-500" },
    { title: "Hours Coded", value: "124", icon: Clock, color: "text-orange-500" },
  ]

  const recentTeams = [
    { name: "Team Alpha", members: 4, project: "AI Chat Bot", progress: 75, status: "active" },
    { name: "Code Warriors", members: 3, project: "E-commerce App", progress: 40, status: "active" },
    { name: "Hack Squad", members: 5, project: "Health Tracker", progress: 90, status: "submitted" },
  ]

  const upcomingHackathons = [
    { name: "AI Innovation Challenge", date: "Dec 15-17", participants: 150, prize: "$5,000" },
    { name: "Green Tech Hackathon", date: "Jan 8-10", participants: 89, prize: "$3,000" },
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your hackathon journey</p>
        </div>
        <div className="flex gap-3">
          <CreateTeamModal />
          <Button variant="outline">
            <Trophy className="w-4 h-4 mr-2" />
            Join Hackathon
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Teams */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Teams</CardTitle>
              <Link to="/teams">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <CardDescription>Teams you're currently part of</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTeams.map((team) => (
              <div key={team.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{team.name}</h3>
                    <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                      {team.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{team.project}</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{team.members} members</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Hackathons */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Hackathons</CardTitle>
              <Link to="/hackathons">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <CardDescription>Don't miss out on these exciting events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingHackathons.map((hackathon) => (
              <div key={hackathon.name} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{hackathon.name}</h3>
                  <Badge variant="outline">{hackathon.prize}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {hackathon.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {hackathon.participants} joined
                  </div>
                </div>
                <Button className="w-full mt-3 gradient-bg">
                  Register Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
