
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Mail, Edit, Save, X, Phone } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  user_id: string
  display_name: string | null
  email: string | null
  phone: string | null
  role: string | null
  created_at: string | null
  updated_at: string | null
}

export function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    display_name: '',
    phone: '',
  })
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return
    }
    
    setProfile(data)
    setFormData({
      display_name: data.display_name || '',
      phone: data.phone || '',
    })
  }

  const handleSave = async () => {
    if (!user) return
    
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('user_id', user.id)
    
    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      setIsEditing(false)
      fetchProfile()
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      display_name: profile?.display_name || '',
      phone: profile?.phone || '',
    })
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Profile</CardTitle>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="text-xl">
              {profile.display_name?.[0] || profile.email?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">
                {profile.display_name || 'Anonymous User'}
              </h3>
              <Badge variant="secondary">{profile.role}</Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {profile.email}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <Label htmlFor="display_name">Display Name</Label>
            {isEditing ? (
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                className="mt-1"
              />
            ) : (
              <p className="mt-1 text-sm">{profile.display_name || 'Not set'}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
                placeholder="+1 (555) 123-4567"
              />
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">
                  {profile.phone || 'Not set'}
                </span>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Label>Account Information</Label>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <p>Member since: {new Date(profile.created_at || '').toLocaleDateString()}</p>
              <p>Last updated: {new Date(profile.updated_at || '').toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
