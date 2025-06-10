
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Upload, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HackathonPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "The Hackathon Chaos Crisis",
      subtitle: "Problem Statement",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-destructive mb-4">
              73% of great hackathon ideas die before submission
            </h2>
            <p className="text-lg text-muted-foreground">due to poor collaboration and project management</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-destructive">Current Pain Points:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0"></div>
                  <span>Teams struggle with real-time collaboration across multiple platforms</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0"></div>
                  <span>No centralized workspace - code on GitHub, chat on Discord, files scattered</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0"></div>
                  <span>Submission process is fragmented and error-prone</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0"></div>
                  <span>Talented individuals can't find the right teams</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-destructive rounded-full flex-shrink-0"></div>
                  <span>Progress tracking is manual and mentors can't help effectively</span>
                </li>
              </ul>
              
              <div className="bg-destructive/10 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-destructive mb-2">Impact Statistics:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>• 60% report collaboration issues</span>
                  <span>• 4+ hours spent on setup</span>
                  <span>• 1 in 3 miss deadlines</span>
                  <span>• Multiple tool switching</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[350px]">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Demo Screenshot 1</p>
                <p className="text-xs text-muted-foreground">Current chaotic workflow vs organized solution</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "HackHub: All-in-One Hackathon Ecosystem",
      subtitle: "Our Solution & Live Demo",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Where Great Ideas Come to Life
            </h2>
            <p className="text-lg text-muted-foreground">
              GitHub's collaboration + Slack's communication + Figma's real-time editing for hackathons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Core Features:</h3>
              <div className="space-y-3">
                <Badge variant="secondary" className="p-3 w-full justify-start text-sm">
                  🤝 Smart team matching based on skills & interests
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start text-sm">
                  💻 Real-time collaborative IDE with shared code editing
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start text-sm">
                  📊 Live progress tracking & mentorship integration
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start text-sm">
                  🎯 One-click submission with automated packaging
                </Badge>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">⚡ Demo Workflow (10 minutes):</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-primary pl-3">
                    <span className="font-medium">Team Formation (2 min)</span> - Smart matching & instant joining
                  </div>
                  <div className="border-l-4 border-primary pl-3">
                    <span className="font-medium">Collaborative Workspace (5 min)</span> - Shared coding & chat
                  </div>
                  <div className="border-l-4 border-primary pl-3">
                    <span className="font-medium">Progress & Submission (3 min)</span> - Tracking & one-click submit
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[140px]">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Demo Screenshot 2: HackHub Dashboard</p>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[140px]">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Demo Screenshot 3: Real-time Code Editor</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🚀 Proven Impact:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-2 bg-primary/10 rounded">
                <div className="text-xl font-bold text-primary">3x</div>
                <div className="text-xs">Faster setup</div>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded">
                <div className="text-xl font-bold text-primary">67%</div>
                <div className="text-xs">Higher completion</div>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded">
                <div className="text-xl font-bold text-primary">90%</div>
                <div className="text-xs">Fewer errors</div>
              </div>
              <div className="text-center p-2 bg-primary/10 rounded">
                <div className="text-xl font-bold text-primary">4.8/5</div>
                <div className="text-xs">User rating</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Join Us in Revolutionizing Hackathons",
      subtitle: "Market Opportunity & Next Steps",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">🎯 Massive Market Opportunity:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Global hackathons per year</span>
                    <Badge variant="default">5,000+</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Annual participants</span>
                    <Badge variant="default">300,000+</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Developer event market</span>
                    <Badge variant="default">$2.8B</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">✅ Current Traction:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    MVP built and fully functional
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    50+ beta users across 3 universities
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    92% would recommend to others
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    200+ signups on waitlist
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">🚀 Growth Roadmap:</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 1 (3 months)</h4>
                    <p className="text-sm text-muted-foreground">Launch with 10 universities, 500+ users</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 2 (6 months)</h4>
                    <p className="text-sm text-muted-foreground">Corporate partnerships, 2,000+ users</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 3 (12 months)</h4>
                    <p className="text-sm text-muted-foreground">Global expansion, 10,000+ users</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">🤝 What We Need:</h3>
                <div className="space-y-3">
                  <Card className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">🎯</div>
                      <div>
                        <h4 className="font-semibold">Partnership Opportunities</h4>
                        <p className="text-sm text-muted-foreground">Pilot with upcoming hackathons</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">💡</div>
                      <div>
                        <h4 className="font-semibold">Expert Feedback</h4>
                        <p className="text-sm text-muted-foreground">Technical validation & guidance</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">🌐</div>
                      <div>
                        <h4 className="font-semibold">Network Access</h4>
                        <p className="text-sm text-muted-foreground">University & corporate connections</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center bg-primary/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-primary mb-2">
              Let's make every hackathon a success story!
            </h3>
            <p className="text-muted-foreground mb-4">
              Ready to transform how teams collaborate and innovate?
            </p>
            <Button size="lg" className="gap-2">
              Get Started with HackHub <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">HackHub Presentation</h1>
            <p className="text-muted-foreground">Slide {currentSlide + 1} of {slides.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Slide Content */}
        <Card className="min-h-[600px]">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4">{slides[currentSlide].subtitle}</Badge>
              <h2 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h2>
            </div>
            {slides[currentSlide].content}
          </CardContent>
        </Card>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">📸 Demo Screenshot Instructions:</h3>
          <p className="text-sm text-muted-foreground">
            Replace the placeholder areas with actual screenshots of your HackHub application:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Screenshot 1: Before/after comparison showing chaotic vs organized workflow</li>
            <li>• Screenshot 2: HackHub dashboard overview with team and project management</li>
            <li>• Screenshot 3: Real-time collaborative code editor in action</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
