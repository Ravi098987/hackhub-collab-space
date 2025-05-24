
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Clock, 
  Users, 
  DollarSign, 
  Calendar,
  MapPin,
  Star,
  Filter
} from "lucide-react"
import { HostHackathonModal } from "@/components/HostHackathonModal"
import { useToast } from "@/hooks/use-toast"

export default function Hackathons() {
  const { toast } = useToast()

  const handleRegister = (hackathonName: string) => {
    // TODO: Integrate with Supabase
    console.log('Registering for:', hackathonName)
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${hackathonName}.`,
    })
  }

  const handleContinue = (hackathonName: string) => {
    // TODO: Navigate to hackathon workspace
    console.log('Continuing:', hackathonName)
    toast({
      title: "Welcome back!",
      description: `Continuing ${hackathonName}.`,
    })
  }

  const activeHackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      description: "Build innovative AI solutions that can solve real-world problems",
      organizer: "TechCorp Inc.",
      startDate: "Dec 15, 2024",
      endDate: "Dec 17, 2024",
      status: "ongoing",
      progress: 45,
      participants: 156,
      prize: "$10,000",
      categories: ["AI/ML", "Innovation"],
      difficulty: "Advanced",
      location: "Virtual",
      registered: true
    },
    {
      id: 2,
      title: "Green Tech Hackathon",
      description: "Create sustainable technology solutions for environmental challenges",
      organizer: "EcoFuture Foundation",
      startDate: "Jan 8, 2025",
      endDate: "Jan 10, 2025",
      status: "upcoming",
      progress: 0,
      participants: 89,
      prize: "$5,000",
      categories: ["Sustainability", "CleanTech"],
      difficulty: "Intermediate",
      location: "Virtual",
      registered: true
    }
  ]

  const upcomingHackathons = [
    {
      id: 3,
      title: "FinTech Revolution",
      description: "Disrupt the financial industry with blockchain and fintech innovations",
      organizer: "FinanceHub",
      startDate: "Feb 20, 2025",
      endDate: "Feb 22, 2025",
      status: "upcoming",
      participants: 0,
      prize: "$15,000",
      categories: ["Blockchain", "FinTech"],
      difficulty: "Advanced",
      location: "San Francisco, CA",
      registrationEnd: "Feb 15, 2025"
    },
    {
      id: 4,
      title: "Health Innovation Challenge",
      description: "Develop technology solutions to improve healthcare accessibility",
      organizer: "HealthTech Alliance",
      startDate: "Mar 12, 2025",
      endDate: "Mar 14, 2025",
      status: "upcoming",
      participants: 23,
      prize: "$8,000",
      categories: ["HealthTech", "Innovation"],
      difficulty: "Beginner",
      location: "Virtual",
      registrationEnd: "Mar 8, 2025"
    }
  ]

  const pastHackathons = [
    {
      id: 5,
      title: "Web3 Builder Summit",
      description: "Built decentralized applications and blockchain solutions",
      organizer: "Web3 Foundation",
      startDate: "Nov 10, 2024",
      endDate: "Nov 12, 2024",
      status: "completed",
      participants: 234,
      prize: "$20,000",
      categories: ["Web3", "Blockchain"],
      difficulty: "Advanced",
      location: "Virtual",
      yourRank: 15,
      totalTeams: 89
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-500"
      case "Intermediate": return "text-yellow-500"
      case "Advanced": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hackathons</h1>
          <p className="text-muted-foreground">Discover and participate in exciting hackathon events</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <HostHackathonModal />
        </div>
      </div>

      {/* Active Hackathons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Hackathons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {hackathon.title}
                      <Badge variant={hackathon.status === 'ongoing' ? 'default' : 'secondary'}>
                        {hackathon.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">{hackathon.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className={getDifficultyColor(hackathon.difficulty)}>{hackathon.difficulty}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.startDate} - {hackathon.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.prize} prize</span>
                    </div>
                  </div>

                  {hackathon.status === 'ongoing' && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{hackathon.progress}%</span>
                      </div>
                      <Progress value={hackathon.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {hackathon.registered ? (
                      <>
                        <Button 
                          className="flex-1 gradient-bg"
                          onClick={() => handleContinue(hackathon.title)}
                        >
                          Continue
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          className="flex-1 gradient-bg"
                          onClick={() => handleRegister(hackathon.title)}
                        >
                          Register Now
                        </Button>
                        <Button variant="outline">
                          Learn More
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Hackathons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Hackathons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{hackathon.title}</CardTitle>
                    <CardDescription className="mt-2">{hackathon.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className={getDifficultyColor(hackathon.difficulty)}>{hackathon.difficulty}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.startDate} - {hackathon.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.participants} registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.prize} prize</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Registration ends: {hackathon.registrationEnd}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 gradient-bg"
                      onClick={() => handleRegister(hackathon.title)}
                    >
                      Register Now
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Hackathons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Past Hackathons</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow opacity-80">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {hackathon.title}
                      <Badge variant="secondary">Completed</Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">{hackathon.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.startDate} - {hackathon.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <span>Rank: {hackathon.yourRank}/{hackathon.totalTeams}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{hackathon.prize} prize</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Results
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
