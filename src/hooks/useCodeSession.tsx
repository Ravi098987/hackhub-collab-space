
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface CodeSession {
  id: string;
  name: string;
  description: string | null;
  language: string;
  code: string;
  owner_id: string;
  team_id: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CodeExecution {
  id: string;
  session_id: string;
  user_id: string;
  code: string;
  language: string;
  output: string | null;
  error_message: string | null;
  execution_time: number | null;
  created_at: string;
}

export const useCodeSession = (sessionId: string | null) => {
  const [session, setSession] = useState<CodeSession | null>(null);
  const [sessions, setSessions] = useState<CodeSession[]>([]);
  const [executions, setExecutions] = useState<CodeExecution[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch code sessions
  const fetchSessions = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('code_sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load code sessions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Fetch single session
  const fetchSession = useCallback(async (sessionId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('code_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      setSession(data);
    } catch (error) {
      console.error('Error fetching session:', error);
      toast({
        title: 'Error',
        description: 'Failed to load code session',
        variant: 'destructive',
      });
    }
  }, [user, toast]);

  // Update session code
  const updateSessionCode = async (code: string) => {
    if (!user || !sessionId) return;

    try {
      const { error } = await supabase
        .from('code_sessions')
        .update({ code, updated_at: new Date().toISOString() })
        .eq('id', sessionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating session:', error);
      toast({
        title: 'Error',
        description: 'Failed to update code',
        variant: 'destructive',
      });
    }
  };

  // Create a new session
  const createSession = async (name: string, description: string = '', language: string = 'javascript', isPublic: boolean = false, teamId: string | null = null) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('code_sessions')
        .insert({
          name,
          description,
          language,
          owner_id: user.id,
          team_id: teamId,
          is_public: isPublic,
          code: `// Welcome to ${name}\n// Start coding here!\n\nfunction main() {\n  console.log("Hello, World!");\n}\n\nmain();`
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchSessions();
      toast({
        title: 'Success',
        description: 'Code session created successfully',
      });
      
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: 'Error',
        description: 'Failed to create code session',
        variant: 'destructive',
      });
    }
  };

  // Execute code
  const executeCode = async (code: string, language: string) => {
    if (!user || !sessionId) return;

    const startTime = Date.now();
    try {
      let output = '';
      let errorMessage = null;

      // Simple JavaScript execution for demo
      if (language === 'javascript') {
        const logs: string[] = [];
        const originalConsole = console.log;
        
        console.log = (...args) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        try {
          const func = new Function(code);
          const result = func();
          
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
          
          output = logs.join('\n') || 'Code executed successfully (no output)';
        } catch (error) {
          errorMessage = error.message;
        } finally {
          console.log = originalConsole;
        }
      } else {
        output = `Code execution for ${language} is not supported yet.\nSupported languages: JavaScript`;
      }

      const executionTime = Date.now() - startTime;

      // Save execution to database
      const { error } = await supabase
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

      if (error) throw error;

      return { output, error: errorMessage, executionTime };
    } catch (error) {
      console.error('Error executing code:', error);
      toast({
        title: 'Error',
        description: 'Failed to execute code',
        variant: 'destructive',
      });
      return { output: '', error: 'Execution failed', executionTime: 0 };
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel('code-sessions')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'code_sessions',
          filter: `id=eq.${sessionId}`
        },
        (payload) => {
          setSession(payload.new as CodeSession);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'code_executions',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          setExecutions(prev => [...prev, payload.new as CodeExecution]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Initial data fetch
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId);
    }
  }, [sessionId, fetchSession]);

  return {
    session,
    sessions,
    executions,
    loading,
    updateSessionCode,
    createSession,
    executeCode,
    fetchSessions,
    fetchSession
  };
};
