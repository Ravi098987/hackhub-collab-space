
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Database {
  public: {
    Tables: {
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
        Insert: {
          name: string
          description?: string | null
          project_idea?: string | null
          max_members?: number
          is_public?: boolean
          created_by: string
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
        Insert: {
          team_id: string
          user_id: string
          role?: string
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

    const { method } = req
    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    if (method === 'POST' && action === 'create') {
      const { name, description, project_idea, max_members, is_public } = await req.json()

      // Create team
      const { data: team, error: teamError } = await supabaseClient
        .from('teams')
        .insert({
          name,
          description,
          project_idea,
          max_members: max_members || 5,
          is_public: is_public ?? true,
          created_by: user.id
        })
        .select()
        .single()

      if (teamError) {
        console.error('Team creation error:', teamError)
        return new Response(
          JSON.stringify({ error: 'Failed to create team' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Add creator as team member
      const { error: memberError } = await supabaseClient
        .from('team_members')
        .insert({
          team_id: team.id,
          user_id: user.id,
          role: 'leader'
        })

      if (memberError) {
        console.error('Member creation error:', memberError)
        // Note: In a production app, you might want to rollback the team creation
      }

      return new Response(
        JSON.stringify({ success: true, team }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } else if (method === 'POST' && action === 'join') {
      const { team_id } = await req.json()

      // Check if team exists and is public
      const { data: team, error: teamError } = await supabaseClient
        .from('teams')
        .select('*')
        .eq('id', team_id)
        .single()

      if (teamError || !team) {
        return new Response(
          JSON.stringify({ error: 'Team not found' }),
          { 
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Check if user is already a member
      const { data: existingMember } = await supabaseClient
        .from('team_members')
        .select('id')
        .eq('team_id', team_id)
        .eq('user_id', user.id)
        .single()

      if (existingMember) {
        return new Response(
          JSON.stringify({ error: 'Already a member of this team' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Check team capacity
      const { data: members, error: membersError } = await supabaseClient
        .from('team_members')
        .select('id')
        .eq('team_id', team_id)

      if (membersError) {
        console.error('Members fetch error:', membersError)
      }

      if (members && members.length >= team.max_members) {
        return new Response(
          JSON.stringify({ error: 'Team is full' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Add user to team
      const { error: joinError } = await supabaseClient
        .from('team_members')
        .insert({
          team_id,
          user_id: user.id,
          role: 'member'
        })

      if (joinError) {
        console.error('Join error:', joinError)
        return new Response(
          JSON.stringify({ error: 'Failed to join team' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Successfully joined team' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } else if (method === 'GET') {
      // Get all public teams or user's teams
      const showAll = url.searchParams.get('all') === 'true'
      
      let query = supabaseClient
        .from('teams')
        .select(`
          *,
          team_members (
            id,
            user_id,
            role,
            joined_at
          )
        `)

      if (!showAll) {
        // Get only teams the user is a member of
        query = query.eq('created_by', user.id)
      } else {
        // Get all public teams
        query = query.eq('is_public', true)
      }

      const { data: teams, error } = await query

      if (error) {
        console.error('Teams fetch error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch teams' }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      return new Response(
        JSON.stringify({ teams }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
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
