import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CodeEditor } from "@/components/CodeEditor"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { 
  MessageCircle, 
  Code, 
  FileText, 
  Upload, 
  Send, 
  Users, 
  Clock,
  CheckSquare,
  Plus,
  Download
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Workspace() {
  const [message, setMessage] = useState("")
  const [code, setCode] = useState(`// Welcome to your collaborative code editor
function greetTeam() {
  console.log("Hello, Team Alpha! Let's build something amazing!");
}

// TODO: Implement the main feature
function mainFeature() {
  // Your implementation here
}

greetTeam();`)

  const [chatMessages, setChatMessages] = useState([
    { user: "Sarah", message: "Hey team! I've started working on the frontend components", time: "10:30 AM", avatar: "SS" },
    { user: "Mike", message: "Great! I'm designing the user interface. Should be ready for review soon.", time: "10:32 AM", avatar: "MJ" },
    { user: "Lisa", message: "I'll handle the backend API. Let me know what endpoints you need.", time: "10:35 AM", avatar: "LW" },
    { user: "John", message: "Perfect! Let's sync up on the database schema in 30 mins.", time: "10:40 AM", avatar: "JD" },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, task: "Set up project structure", completed: true, assignee: "John" },
    { id: 2, task: "Design user interface mockups", completed: true, assignee: "Mike" },
    { id: 3, task: "Implement user authentication", completed: false, assignee: "Sarah" },
    { id: 4, task: "Create database schema", completed: false, assignee: "Lisa" },
    { id: 5, task: "Build REST API endpoints", completed: false, assignee: "Lisa" },
    { id: 6, task: "Frontend components development", completed: false, assignee: "Sarah" },
  ])

  const [files, setFiles] = useState([
    { name: "project_proposal.pdf", size: "2.4 MB", uploadedBy: "John", time: "2 hours ago" },
    { name: "ui_mockups.fig", size: "5.7 MB", uploadedBy: "Mike", time: "1 hour ago" },
    { name: "api_documentation.md", size: "145 KB", uploadedBy: "Lisa", time: "30 mins ago" },
  ])

  const [notes, setNotes] = useState(`# Team Alpha - Project Notes

## Project Overview
Building an AI-powered chatbot for customer service automation.

## Key Features
- Natural language processing
- Multi-language support
- Integration with existing systems
- Real-time responses

## Technical Stack
- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB
- AI/ML: OpenAI API

## Timeline
- Day 1: Project setup and planning ✅
- Day 2: Core development
- Day 3: Testing and refinement
- Final: Presentation preparation`)

  const { toast } = useToast()

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: "You",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "YU"
      }
      setChatMessages(prev => [...prev, newMessage])
      setMessage("")
      toast({
        title: "Message sent",
        description: "Your message has been sent to the team chat.",
      })
    }
  }

  const handleTaskToggle = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    toast({
      title: "Task updated",
      description: "Task status has been changed.",
    })
  }

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      task: "New task",
      completed: false,
      assignee: "Unassigned"
    }
    setTasks(prev => [...prev, newTask])
    toast({
      title: "Task added",
      description: "A new task has been added to the list.",
    })
  }

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile = {
      name: "new_document.pdf",
      size: "1.2 MB",
      uploadedBy: "You",
      time: "just now"
    }
    setFiles(prev => [...prev, newFile])
    toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully.",
    })
  }

  const handleFileDownload = (fileName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${fileName}...`,
    })
  }

  return (
    <ThemeProvider>
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Team Alpha Workspace
              <Badge>AI Innovation Challenge</Badge>
            </h1>
            <p className="text-muted-foreground">Collaborative space for your hackathon project</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Time left: 2d 14h 23m</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">4 members online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Code Editor
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="files" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enhanced Code Editor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      language="javascript"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write your team notes here..."
                      className="min-h-[400px] resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Shared Files</CardTitle>
                      <Button size="sm" className="gradient-bg" onClick={handleFileUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.size} • Uploaded by {file.uploadedBy} • {file.time}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFileDownload(file.name)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Team Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {chatMessages.map((chat, index) => (
                    <div key={index} className="flex gap-3">
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
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" />
                    Tasks
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={handleAddTask}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="rounded"
                        onChange={() => handleTaskToggle(task.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.task}
                        </p>
                        <p className="text-xs text-muted-foreground">{task.assignee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "John Doe", role: "Team Lead", status: "online", avatar: "JD" },
                    { name: "Sarah Smith", role: "Developer", status: "online", avatar: "SS" },
                    { name: "Mike Johnson", role: "Designer", status: "away", avatar: "MJ" },
                    { name: "Lisa Wang", role: "Developer", status: "online", avatar: "LW" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
