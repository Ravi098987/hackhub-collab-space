
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Code, Trophy, Users, Zap, Star, ArrowRight, CheckCircle, Github, Linkedin, Twitter, Play, Timer, Brain, Lightbulb, Target, Rocket, Award, Coffee, Clock, Phone, Mail, Heart } from "lucide-react"
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
      gradient: "from-purple-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ravina", 
      phone: "+91-XXXXXXXXXX",
      email: "ravina@example.com",
      avatar: "R",
      role: "Software Developer",
      gradient: "from-pink-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-purple-300/30 text-6xl font-mono animate-bounce">{'<>'}</div>
        <div className="absolute top-40 right-32 text-cyan-300/30 text-4xl font-mono animate-bounce delay-300">{'{ }'}</div>
        <div className="absolute bottom-32 left-32 text-pink-300/30 text-5xl font-mono animate-bounce delay-700">{'</>'}</div>
        <div className="absolute bottom-20 right-20 text-blue-300/30 text-3xl font-mono animate-bounce delay-1000">{'[]'}</div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">HackHub</h1>
              <p className="text-xs text-purple-300">Where Ideas Become Reality</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#hackathons" className="text-gray-300 hover:text-white transition-colors font-medium">Hackathons</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors font-medium">Success Stories</a>
            <a href="#builders" className="text-gray-300 hover:text-white transition-colors font-medium">Builders</a>
            <a href="#auth" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all font-medium">
              Join Now
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 px-6 py-2 text-lg">
            🏆 Join 50,000+ Developers Worldwide
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Build. Collaborate.
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
              Hack. 🚀
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto font-light">
            Your ultimate platform for organizing and joining virtual hackathons.
          </p>
          <p className="text-lg text-purple-300 mb-12 max-w-2xl mx-auto">
            Transform your boldest ideas into reality in just 48 hours. Join the world's most exciting hackathon platform where innovation meets opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="#auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-10 py-4 text-lg rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                Get Started <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </a>
            <a href="#auth">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-10 py-4 text-lg rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all">
                Host Your Hackathon Now <Rocket className="w-6 h-6 ml-3" />
              </Button>
            </a>
            <VideoModal>
              <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white hover:text-slate-900 px-10 py-4 text-lg rounded-full backdrop-blur-sm bg-white/10">
                <Play className="w-6 h-6 mr-3" />
                Watch Success Stories
              </Button>
            </VideoModal>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {hackathonStats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
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
                <CardContent className="p-8">
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

      {/* Meet the Builders Section */}
      <section id="builders" className="px-6 py-20 bg-gradient-to-br from-black/40 to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-red-400 animate-pulse" />
              <h2 className="text-5xl font-bold text-white">Made by ...</h2>
            </div>
            <p className="text-gray-300 text-xl">Meet the passionate builders behind HackHub</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {builders.map((builder, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <CardContent className="p-8 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <AvatarImage src={builder.image} alt={builder.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${builder.gradient} text-white text-2xl font-bold`}>
                      {builder.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{builder.name}</h3>
                  <p className="text-purple-300 mb-6 font-medium">{builder.role}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-center text-gray-300 hover:text-white transition-colors group/contact">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover/contact:bg-green-500/20 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm">{builder.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 justify-center text-gray-300 hover:text-white transition-colors group/contact">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover/contact:bg-blue-500/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm">{builder.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-8">
                    <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full border-white/20 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full border-white/20 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="w-10 h-10 p-0 rounded-full border-white/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-xl">HackHub</span>
                <p className="text-purple-300 text-sm">Innovating the Future</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2025 HackHub. All rights reserved. Built by Ravi & Ravina .</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
