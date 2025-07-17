
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          email: string | null
          avatar_url: string | null
          bio: string | null
          github_username: string | null
          twitter_username: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          project_idea: string | null
          max_members: number
          is_public: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: string
          joined_at: string
        }
      }
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT token
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get user analytics data
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      console.error('Profile error:', profileError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get teams the user is part of
    const { data: teamMemberships, error: teamError } = await supabaseClient
      .from('team_members')
      .select(`
        id,
        role,
        joined_at,
        teams (
          id,
          name,
          description,
          created_at
        )
      `)
      .eq('user_id', user.id)

    if (teamError) {
      console.error('Team error:', teamError)
    }

    // Get teams created by user
    const { data: createdTeams, error: createdTeamsError } = await supabaseClient
      .from('teams')
      .select('*')
      .eq('created_by', user.id)

    if (createdTeamsError) {
      console.error('Created teams error:', createdTeamsError)
    }

    const analytics = {
      profile,
      teamMemberships: teamMemberships || [],
      createdTeams: createdTeams || [],
      stats: {
        teamsJoined: teamMemberships?.length || 0,
        teamsCreated: createdTeams?.length || 0,
        totalTeams: (teamMemberships?.length || 0) + (createdTeams?.length || 0),
      }
    }

    return new Response(
      JSON.stringify(analytics),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
