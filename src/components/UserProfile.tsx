
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Mail, Edit, Save, X } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  display_name: string | null
  email: string | null
  avatar_url: string | null
  bio: string | null
  github_username: string | null
  twitter_username: string | null
  role: string | null
}

export function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    github_username: '',
    twitter_username: '',
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
      bio: data.bio || '',
      github_username: data.github_username || '',
      twitter_username: data.twitter_username || '',
    })
  }

  const handleSave = async () => {
    const { error } = await updateProfile(formData)
    if (!error) {
      setIsEditing(false)
      fetchProfile()
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      display_name: profile?.display_name || '',
      bio: profile?.bio || '',
      github_username: profile?.github_username || '',
      twitter_username: profile?.twitter_username || '',
    })
  }

  if (!profile) {
    return <div>Loading...</div>
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
            <AvatarImage src={profile.avatar_url || undefined} />
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
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="mt-1"
                rows={3}
              />
            ) : (
              <p className="mt-1 text-sm">{profile.bio || 'No bio yet'}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="github_username">GitHub Username</Label>
              {isEditing ? (
                <Input
                  id="github_username"
                  value={formData.github_username}
                  onChange={(e) => setFormData(prev => ({ ...prev, github_username: e.target.value }))}
                  className="mt-1"
                  placeholder="username"
                />
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.github_username || 'Not connected'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="twitter_username">Twitter Username</Label>
              {isEditing ? (
                <Input
                  id="twitter_username"
                  value={formData.twitter_username}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter_username: e.target.value }))}
                  className="mt-1"
                  placeholder="username"
                />
              ) : (
                <div className="mt-1 flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">
                    {profile.twitter_username || 'Not connected'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
