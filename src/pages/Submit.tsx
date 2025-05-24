
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Github, 
  Globe, 
  FileText, 
  Image, 
  Video,
  Clock,
  CheckCircle,
  AlertCircle 
} from "lucide-react"
import { useState } from "react"
import { FileUpload } from "@/components/FileUpload"
import { useToast } from "@/hooks/use-toast"

export default function Submit() {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Supabase
    console.log('Submitting project:', { projectName, description, githubUrl, liveUrl })
    toast({
      title: "Project Submitted!",
      description: "Your project has been successfully submitted for review.",
    })
  }

  const handleSaveDraft = () => {
    // TODO: Save to Supabase
    console.log('Saving draft:', { projectName, description, githubUrl, liveUrl })
    toast({
      title: "Draft Saved",
      description: "Your project has been saved as a draft.",
    })
  }

  const submissions = [
    {
      id: 1,
      hackathon: "AI Innovation Challenge",
      team: "Team Alpha",
      project: "AI Customer Service Bot",
      status: "draft",
      deadline: "2 days left",
      submitted: false
    },
    {
      id: 2,
      hackathon: "Green Tech Hackathon",
      team: "Code Warriors",
      project: "EcoShop Platform",
      status: "submitted",
      deadline: "Submitted",
      submitted: true
    }
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Submissions</h1>
          <p className="text-muted-foreground">Submit your hackathon projects and track their status</p>
        </div>
      </div>

      {/* Current Submissions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Submissions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className={`hover:shadow-lg transition-shadow ${submission.submitted ? 'border-green-500' : 'border-orange-500'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {submission.project}
                      {submission.submitted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </CardTitle>
                    <CardDescription>{submission.hackathon} • {submission.team}</CardDescription>
                  </div>
                  <Badge variant={submission.submitted ? 'default' : 'secondary'}>
                    {submission.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {submission.deadline}
                  </div>
                  <Button 
                    variant={submission.submitted ? "outline" : "default"}
                    className={!submission.submitted ? "gradient-bg" : ""}
                  >
                    {submission.submitted ? "View Submission" : "Complete Submission"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Submit New Project */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Project - AI Innovation Challenge</CardTitle>
          <CardDescription>
            Complete your project submission for Team Alpha. Deadline: December 17, 2024 at 11:59 PM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Enter your project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Input id="team" value="Team Alpha" disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, its features, and the problem it solves..."
                className="min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Repository</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="github"
                    placeholder="https://github.com/username/repo"
                    className="pl-10"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="live">Live Demo URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="live"
                    placeholder="https://your-demo.com"
                    className="pl-10"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <Label>Additional Files</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FileUpload
                  accept=".ppt,.pptx,.pdf"
                  maxSize={10}
                  title="Presentation"
                  description="PPT, PDF (max 10MB)"
                  icon={FileText}
                />

                <FileUpload
                  accept=".png,.jpg,.jpeg"
                  maxSize={5}
                  title="Screenshots"
                  description="PNG, JPG (max 5MB each)"
                  icon={Image}
                />

                <FileUpload
                  accept=".mp4,.mov,.avi"
                  maxSize={100}
                  title="Demo Video"
                  description="MP4 (max 100MB)"
                  icon={Video}
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "OpenAI API", "Tailwind CSS"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    {tech}
                  </Badge>
                ))}
                <Button size="sm" variant="outline" type="button">
                  + Add Technology
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                * Required fields. Your submission will be reviewed by the judges.
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                <Button type="submit" className="gradient-bg">
                  Submit Project
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
