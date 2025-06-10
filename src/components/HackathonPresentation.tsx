
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
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  Teams struggle with real-time collaboration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  No centralized workspace for code & files
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  Submission process is fragmented
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  Talented individuals can't find teams
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  Progress tracking is manual & inefficient
                </li>
              </ul>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Demo Screenshot 1</p>
                <p className="text-xs text-muted-foreground">Current chaotic workflow</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "HackHub: Where Great Ideas Come to Life",
      subtitle: "Our Solution Overview",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              All-in-One Hackathon Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground">
              The first platform combining GitHub's collaboration + Slack's communication + Figma's real-time editing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Key Innovations:</h3>
              <div className="space-y-3">
                <Badge variant="secondary" className="p-3 w-full justify-start">
                  🚀 Real-time collaborative workspace with integrated IDE
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start">
                  🤝 Smart team matching algorithm
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start">
                  📝 Seamless submission management
                </Badge>
                <Badge variant="secondary" className="p-3 w-full justify-start">
                  📊 Live progress tracking & mentorship
                </Badge>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Demo Screenshot 2</p>
                <p className="text-xs text-muted-foreground">HackHub Dashboard Overview</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Live Demo: From Idea to Submission in Minutes",
      subtitle: "How It Works",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Demo Workflow:</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">1. Team Formation</h4>
                  <p className="text-sm text-muted-foreground">Smart matching based on skills & interests</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">2. Collaborative Workspace</h4>
                  <p className="text-sm text-muted-foreground">Shared code editor, file management, chat</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">3. Progress Tracking</h4>
                  <p className="text-sm text-muted-foreground">Real-time updates, milestone management</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">4. Seamless Submission</h4>
                  <p className="text-sm text-muted-foreground">One-click project submission with all assets</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[140px]">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Demo Screenshot 3: Team Formation</p>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[140px]">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Demo Screenshot 4: Code Editor</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="font-semibold mb-2">⚡ Key Features Highlight:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <span>Real-time code collaboration</span>
              <span>Integrated file management</span>
              <span>Context-aware team chat</span>
              <span>Automated submission workflow</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Transforming the $2.8B Developer Event Industry",
      subtitle: "Market Opportunity & Impact",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Market Size:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Hackathons globally per year</span>
                    <Badge variant="default">5,000+</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Participants annually</span>
                    <Badge variant="default">300,000+</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Developer event market</span>
                    <Badge variant="default">$2.8B</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Impact Metrics:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="text-2xl font-bold text-primary">3x</div>
                    <div className="text-xs">Faster team formation</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="text-2xl font-bold text-primary">50%</div>
                    <div className="text-xs">Higher completion</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="text-2xl font-bold text-primary">2x</div>
                    <div className="text-xs">Better collaboration</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded">
                    <div className="text-2xl font-bold text-primary">90%</div>
                    <div className="text-xs">Fewer errors</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Demo Screenshot 5</p>
                <p className="text-xs text-muted-foreground">Analytics & Impact Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎯 Why Now?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <span>• Remote/hybrid work normalization</span>
              <span>• Growing demand for developer talent</span>
              <span>• Corporate innovation through hackathons</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Join Us in Revolutionizing Hackathons",
      subtitle: "Next Steps & Ask",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Traction So Far:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    MVP built and tested ✅
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    50+ beta users signed up ✅
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Positive feedback from 3 universities ✅
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Roadmap:</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 1 (3 months)</h4>
                    <p className="text-sm text-muted-foreground">Launch beta with 10 universities</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 2 (6 months)</h4>
                    <p className="text-sm text-muted-foreground">Corporate hackathon partnerships</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Phase 3 (12 months)</h4>
                    <p className="text-sm text-muted-foreground">Global platform expansion</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Our Ask:</h3>
                <div className="space-y-3">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🤝</div>
                      <div>
                        <h4 className="font-semibold">Partnership</h4>
                        <p className="text-sm text-muted-foreground">with hackathon organizers</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h4 className="font-semibold">Feedback</h4>
                        <p className="text-sm text-muted-foreground">from jury and potential users</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <h4 className="font-semibold">Support</h4>
                        <p className="text-sm text-muted-foreground">to pilot with upcoming events</p>
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
              Get Started <ExternalLink className="w-4 h-4" />
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
            <li>• Screenshot 1: Current chaotic workflow (comparison image)</li>
            <li>• Screenshot 2: HackHub dashboard overview</li>
            <li>• Screenshot 3: Team formation/matching interface</li>
            <li>• Screenshot 4: Collaborative code editor in action</li>
            <li>• Screenshot 5: Analytics and impact dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
