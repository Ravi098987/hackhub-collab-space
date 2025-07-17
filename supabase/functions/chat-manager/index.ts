
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders });
    }

    const { action, roomId, message, messageType = 'text', metadata = {} } = await req.json();

    switch (action) {
      case 'sendMessage':
        const { error: messageError } = await supabaseClient
          .from('chat_messages')
          .insert({
            room_id: roomId,
            user_id: user.id,
            message,
            message_type: messageType,
            metadata
          });

        if (messageError) throw messageError;

        return new Response(
          JSON.stringify({ success: true, message: 'Message sent successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'createRoom':
        const { name, description = '', roomType = 'public', teamId = null } = await req.json();
        
        const { data: newRoom, error: roomError } = await supabaseClient
          .from('chat_rooms')
          .insert({
            name,
            description,
            room_type: roomType,
            team_id: teamId,
            created_by: user.id
          })
          .select()
          .single();

        if (roomError) throw roomError;

        return new Response(
          JSON.stringify({ success: true, room: newRoom }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response('Invalid action', { status: 400, headers: corsHeaders });
    }
  } catch (error) {
    console.error('Chat manager error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
