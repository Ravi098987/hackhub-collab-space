
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, MapPin, Github, Linkedin, Award, Code } from "lucide-react"
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
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profile.name}</CardTitle>
              <p className="text-muted-foreground">{profile.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {profile.skills.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.skills.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">First Place Winner</p>
                    <p className="text-xs text-muted-foreground">AI Innovation Challenge</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Best Technical Implementation</p>
                    <p className="text-xs text-muted-foreground">FinTech Hackathon</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="skills">Skills & Links</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="github" className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          GitHub Username
                        </Label>
                        <Input
                          id="github"
                          value={profile.github}
                          onChange={(e) => setProfile({...profile, github: e.target.value})}
                          placeholder="johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin" className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Username
                        </Label>
                        <Input
                          id="linkedin"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                          placeholder="johndoe"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Skills</h3>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-red-100" onClick={() => removeSkill(skill)}>
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
            <Button onClick={handleSave} className="gradient-bg">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
