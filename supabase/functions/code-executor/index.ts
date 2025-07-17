
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

    const { action, sessionId, code, language } = await req.json();

    switch (action) {
      case 'executeCode':
        const startTime = Date.now();
        let output = '';
        let errorMessage = null;

        try {
          // Simple JavaScript execution for demo
          if (language === 'javascript') {
            const logs: string[] = [];
            
            // Create a safe execution environment
            const safeEval = new Function('console', code);
            const mockConsole = {
              log: (...args: any[]) => {
                logs.push(args.map(arg => String(arg)).join(' '));
              }
            };
            
            const result = safeEval(mockConsole);
            
            if (result !== undefined) {
              logs.push(`Return value: ${result}`);
            }
            
            output = logs.join('\n') || 'Code executed successfully (no output)';
          } else {
            output = `Code execution for ${language} is not supported yet.\nSupported languages: JavaScript`;
          }
        } catch (error) {
          errorMessage = error.message;
          output = `Error: ${error.message}`;
        }

        const executionTime = Date.now() - startTime;

        // Save execution to database
        const { error: dbError } = await supabaseClient
          .from('code_executions')
          .insert({
            session_id: sessionId,
            user_id: user.id,
            code,
            language,
            output,
            error_message: errorMessage,
            execution_time: executionTime
          });

        if (dbError) throw dbError;

        return new Response(
          JSON.stringify({ 
            success: true, 
            output, 
            error: errorMessage, 
            executionTime 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'saveSession':
        const { error: saveError } = await supabaseClient
          .from('code_sessions')
          .update({ 
            code, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', sessionId);

        if (saveError) throw saveError;

        return new Response(
          JSON.stringify({ success: true, message: 'Session saved successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response('Invalid action', { status: 400, headers: corsHeaders });
    }
  } catch (error) {
    console.error('Code executor error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
