
import { Home, Users, Code, Trophy, Settings, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthModal } from "./AuthModal"
import { useToast } from "@/hooks/use-toast"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "My Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Workspace",
    url: "/workspace",
    icon: Code,
  },
  {
    title: "Hackathons",
    url: "/hackathons",
    icon: Trophy,
  },
  {
    title: "Submit Project",
    url: "/submit",
    icon: Trophy,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const { toast } = useToast()
  const isAuthenticated = true // TODO: Replace with actual auth state

  const handleLogout = () => {
    // TODO: Integrate with Supabase auth
    console.log('Logging out...')
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    })
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">HackHub</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground">Participant</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/profile" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </>
        ) : (
          <AuthModal>
            <Button className="w-full gradient-bg">
              <LogOut className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </AuthModal>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
