
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, MapPin, Github, Linkedin, Award, Code, Terminal, Cpu, Monitor, Wifi, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Profile() {
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about AI and machine learning. Love building innovative solutions during hackathons!",
    github: "johndoe",
    linkedin: "johndoe",
    skills: ["React", "Node.js", "Python", "MongoDB", "TypeScript"]
  })

  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    // TODO: Save to database
    console.log('Saving profile:', profile)
    toast({
      title: "Profile updated!",
      description: "Your profile has been saved successfully.",
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
        
        {/* Circuit Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10,10 L90,10 L90,50 L50,50 L50,90 L90,90" stroke="#8B5CF6" strokeWidth="2" fill="none" />
                <circle cx="10" cy="10" r="3" fill="#8B5CF6" />
                <circle cx="90" cy="10" r="3" fill="#8B5CF6" />
                <circle cx="50" cy="50" r="3" fill="#8B5CF6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-purple-300/20 text-6xl font-mono animate-bounce">{'<>'}</div>
        <div className="absolute top-40 right-32 text-cyan-300/20 text-4xl font-mono animate-bounce delay-300">{'{ }'}</div>
        <div className="absolute bottom-32 left-32 text-pink-300/20 text-5xl font-mono animate-bounce delay-700">{'</>'}</div>
        
        <div className="absolute top-32 right-1/4 text-purple-400/20 animate-pulse delay-200">
          <Terminal className="w-12 h-12" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-cyan-400/20 animate-pulse delay-700">
          <Monitor className="w-16 h-16" />
        </div>
        <div className="absolute top-1/2 right-32 text-pink-400/20 animate-pulse delay-1200">
          <Cpu className="w-10 h-10" />
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Developer Profile 🚀
            </h1>
            <p className="text-gray-300 text-lg">Configure your hackathon journey settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:from-white/15 hover:to-white/10 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-2 border-purple-400/50">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-white text-xl">{profile.name}</CardTitle>
                <p className="text-gray-300">{profile.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {profile.location}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border-purple-400/30 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 6 && (
                      <Badge className="bg-white/10 text-gray-300 border-white/20 text-xs">
                        +{profile.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hackathon Achievements */}
            <Card className="mt-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Hackathon Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">🏆 First Place Winner</p>
                      <p className="text-xs text-gray-300">AI Innovation Challenge</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-white">💻 Best Technical Implementation</p>
                      <p className="text-xs text-gray-300">FinTech Hackathon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20">
                <TabsTrigger value="personal" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Skills & Links
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-400" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-gray-300">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-gray-300">Developer Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={4}
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-cyan-400" />
                      Skills & Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Social Links */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-white flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-blue-400" />
                        Developer Profiles
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="github" className="flex items-center gap-2 text-gray-300">
                            <Github className="w-4 h-4" />
                            GitHub Username
                          </Label>
                          <Input
                            id="github"
                            value={profile.github}
                            onChange={(e) => setProfile({...profile, github: e.target.value})}
                            placeholder="johndoe"
                            className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin" className="flex items-center gap-2 text-gray-300">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn Username
                          </Label>
                          <Input
                            id="linkedin"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                            placeholder="johndoe"
                            className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        Technical Skills
                      </h3>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill (e.g., React, Python)..."
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                        />
                        <Button onClick={addSkill} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border-purple-400/30 cursor-pointer hover:from-red-500/20 hover:to-pink-500/20 hover:border-red-400/30 hover:text-red-200 transition-all" 
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                Save Changes 💾
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
