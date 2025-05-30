import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Code, Trophy, Users, Zap, Star, ArrowRight, CheckCircle, Github, Linkedin, Twitter, Play, Timer, Brain, Lightbulb, Target, Rocket, Award, Coffee, Clock, Phone, Mail, Heart, Terminal, Monitor, Cpu, Wifi } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VideoModal } from "@/components/VideoModal"

export default function Landing() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { toast } = useToast()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Supabase auth
    console.log('Sign in:', { email, password })
    localStorage.setItem('hackhub_auth', 'true')
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    })
    // Reload to trigger auth state change
    window.location.reload()
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Supabase auth
    console.log('Sign up:', { name, email, password })
    localStorage.setItem('hackhub_auth', 'true')
    toast({
      title: "Account created!",
      description: "Your account has been successfully created.",
    })
    // Reload to trigger auth state change
    window.location.reload()
  }

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart Team Formation",
      description: "AI-powered matching to find the perfect teammates based on skills and interests",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Live Coding Arena",
      description: "Real-time collaborative IDE with version control and instant deployment",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Global Competitions",
      description: "Join 24/7 hackathons with prizes worth $500K+ annually",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Mentorship",
      description: "Connect with industry experts and get real-time guidance",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const hackathonStats = [
    { icon: <Timer className="w-6 h-6" />, number: "48hrs", label: "Average Hackathon" },
    { icon: <Brain className="w-6 h-6" />, number: "10K+", label: "Brilliant Minds" },
    { icon: <Trophy className="w-6 h-6" />, number: "$2M+", label: "Prize Money" },
    { icon: <Rocket className="w-6 h-6" />, number: "500+", label: "Startups Born" }
  ]

  const achievements = [
    {
      icon: <Award className="w-6 h-6 text-yellow-400" />,
      title: "Winner Takes All",
      description: "Top 3 teams win cash prizes, mentorship, and startup funding opportunities"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-400" />,
      title: "Innovation Labs",
      description: "Access to cutting-edge APIs, cloud credits, and premium development tools"
    },
    {
      icon: <Target className="w-6 h-6 text-green-400" />,
      title: "Career Boost",
      description: "Direct recruitment opportunities from 200+ partner companies"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer at Meta",
      content: "Won my first $50K prize here! The collaborative tools are incredible and the community is amazing.",
      avatar: "SC",
      company: "Meta"
    },
    {
      name: "Alex Rodriguez",
      role: "Startup Founder",
      content: "Built my billion-dollar startup idea during a 48hr hackathon. The mentorship was game-changing!",
      avatar: "AR",
      company: "TechCorp"
    },
    {
      name: "Jamie Kim",
      role: "AI Research Scientist",
      content: "The best platform for rapid prototyping. From idea to deployed app in record time!",
      avatar: "JK",
      company: "OpenAI"
    }
  ]

  const builders = [
    {
      name: "Ravi",
      phone: "+91-XXXXXXXXXX",
      email: "ravi@example.com",
      avatar: "R",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ravina", 
      phone: "+91-XXXXXXXXXX",
      email: "ravina@example.com",
      avatar: "R",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Matrix-style Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-purple-300/20"></div>
            ))}
          </div>
        </div>
        
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

      {/* Enhanced Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-purple-300/40 text-8xl font-mono animate-bounce">{'<>'}</div>
        <div className="absolute top-40 right-32 text-cyan-300/40 text-6xl font-mono animate-bounce delay-300">{'{ }'}</div>
        <div className="absolute bottom-32 left-32 text-pink-300/40 text-7xl font-mono animate-bounce delay-700">{'</>'}</div>
        <div className="absolute bottom-20 right-20 text-blue-300/40 text-5xl font-mono animate-bounce delay-1000">{'[]'}</div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 text-purple-400/30 animate-pulse delay-200">
          <Terminal className="w-16 h-16" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-cyan-400/30 animate-pulse delay-700">
          <Monitor className="w-20 h-20" />
        </div>
        <div className="absolute top-1/2 right-32 text-pink-400/30 animate-pulse delay-1200">
          <Cpu className="w-14 h-14" />
        </div>
        
        {/* Binary Code Rain */}
        <div className="absolute top-0 left-1/3 text-green-400/20 text-xs font-mono animate-pulse">
          01010101<br/>11001100<br/>10101010<br/>00110011
        </div>
        <div className="absolute top-20 right-1/3 text-blue-400/20 text-xs font-mono animate-pulse delay-500">
          01110111<br/>10011001<br/>11110000<br/>00001111
        </div>
      </div>

      {/* Professional Header */}
      <header className="relative z-50 px-6 py-6 backdrop-blur-sm bg-black/10">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">HackHub</h1>
              <p className="text-sm text-purple-300">Where Innovation Meets Excellence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Features</a>
            <a href="#hackathons" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Hackathons</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Success Stories</a>
            <a href="#builders" className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:scale-105">Builders</a>
            <a href="#auth">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 font-medium">
                Join Revolution
              </Button>
            </a>
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative px-6 py-32 text-center">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-10 bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-200 border-purple-400/40 px-8 py-3 text-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            🏆 Join 50,000+ Elite Developers Worldwide
          </Badge>
          
          <h1 className="text-7xl md:text-9xl font-black text-white mb-12 leading-tight">
            Build. Collaborate.
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block animate-pulse">
              Hack. 🚀
            </span>
          </h1>
          
          <p className="text-3xl text-gray-200 mb-6 max-w-4xl mx-auto font-light">
            Your ultimate platform for organizing and joining virtual hackathons.
          </p>
          <p className="text-xl text-purple-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Transform your boldest ideas into reality in just 48 hours. Join the world's most exciting hackathon platform where innovation meets unlimited opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <a href="#auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl shadow-purple-500/30 hover:shadow-3xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-110 font-semibold">
                Get Started Free <ArrowRight className="w-7 h-7 ml-4" />
              </Button>
            </a>
            <a href="#auth">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl shadow-green-500/30 hover:shadow-3xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 font-semibold">
                Host Hackathon <Rocket className="w-7 h-7 ml-4" />
              </Button>
            </a>
            <VideoModal>
              <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white hover:text-slate-900 px-12 py-6 text-xl rounded-full backdrop-blur-sm bg-white/10 hover:scale-110 transition-all duration-300 font-semibold">
                <Play className="w-7 h-7 mr-4" />
                Watch Demo
              </Button>
            </VideoModal>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {hackathonStats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-3">{stat.number}</div>
                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathon Highlights */}
      <section id="hackathons" className="px-6 py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Developers Choose HackHub</h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              More than just coding competitions - we're building the future of innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center text-base">
                    {achievement.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth" className="px-6 py-20 bg-black/30">
        <div className="max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-2">Join the Revolution</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Your next big breakthrough starts here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1">
                  <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-6 mt-6">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12 text-lg rounded-xl">
                      Sign In & Start Hacking
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-6 mt-6">
                    <div>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12 text-lg rounded-xl">
                      Create Account & Join
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Built for Champions</h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Everything you need to go from idea to award-winning prototype
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Success Stories</h2>
            <p className="text-gray-300 text-xl">From hackathon participants to industry leaders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">{testimonial.name}</div>
                      <div className="text-gray-400">{testimonial.role}</div>
                      <div className="text-purple-300 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Developers Section */}
      <section id="builders" className="px-6 py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Development Team</h2>
            <p className="text-gray-400 text-lg">Meet the professionals behind HackHub</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {builders.map((builder, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-white/20">
                    <AvatarImage src={builder.image} alt={builder.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl font-bold">
                      {builder.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{builder.name}</h3>
                  <p className="text-purple-300 mb-6 font-medium">{builder.role}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                      <span className="font-mono text-sm">{builder.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                      <span className="font-mono text-sm">{builder.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-8">
                    <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="px-6 py-20 border-t border-white/20 bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="flex items-center gap-6 mb-8 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-white font-black text-3xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">HackHub</span>
                <p className="text-purple-300 text-lg font-medium">Innovating the Future</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-4 hover:bg-white/10 rounded-2xl hover:scale-110">
                <Github className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-4 hover:bg-white/10 rounded-2xl hover:scale-110">
                <Twitter className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 p-4 hover:bg-white/10 rounded-2xl hover:scale-110">
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/20 text-center text-gray-400 text-lg">
            <p>&copy; 2025 HackHub. All rights reserved. Built with ❤️ by <span className="text-purple-300 font-semibold">Ravi & Ravina</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}
