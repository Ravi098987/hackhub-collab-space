
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { CodeSession, CodeExecution, CodeSessionParticipant } from '@/types/chat';

export const useCodeSession = (sessionId: string | null) => {
  const [session, setSession] = useState<CodeSession | null>(null);
  const [sessions, setSessions] = useState<CodeSession[]>([]);
  const [executions, setExecutions] = useState<CodeExecution[]>([]);
  const [participants, setParticipants] = useState<CodeSessionParticipant[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch code sessions
  const fetchSessions = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('code_sessions' as any)
        .select('*')
        .or(`is_public.eq.true,owner_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data as unknown as CodeSession[] || []);
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

  // Fetch specific session
  const fetchSession = useCallback(async (sessionId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('code_sessions' as any)
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      setSession(data as unknown as CodeSession);
    } catch (error) {
      console.error('Error fetching session:', error);
      toast({
        title: 'Error',
        description: 'Failed to load session',
        variant: 'destructive',
      });
    }
  }, [user, toast]);

  // Fetch executions for a session
  const fetchExecutions = useCallback(async (sessionId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('code_executions' as any)
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExecutions(data as unknown as CodeExecution[] || []);
    } catch (error) {
      console.error('Error fetching executions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load execution history',
        variant: 'destructive',
      });
    }
  }, [user, toast]);

  // Update session code
  const updateSessionCode = async (code: string) => {
    if (!user || !sessionId) return;

    try {
      const { error } = await supabase
        .from('code_sessions' as any)
        .update({ code })
        .eq('id', sessionId);

      if (error) throw error;
      
      if (session) {
        setSession({ ...session, code });
      }
    } catch (error) {
      console.error('Error updating session code:', error);
      toast({
        title: 'Error',
        description: 'Failed to save code',
        variant: 'destructive',
      });
    }
  };

  // Create a new session
  const createSession = async (
    name: string,
    description: string = '',
    language: string = 'javascript',
    isPublic: boolean = false,
    teamId: string | null = null
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('code_sessions' as any)
        .insert({
          name,
          description,
          language,
          is_public: isPublic,
          team_id: teamId,
          owner_id: user.id
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

    try {
      const { data, error } = await supabase.functions.invoke('code-executor', {
        body: { code, language, sessionId }
      });

      if (error) throw error;

      // Store execution history
      await supabase
        .from('code_executions' as any)
        .insert({
          session_id: sessionId,
          user_id: user.id,
          code,
          language,
          output: data.output,
          error_message: data.error,
          execution_time: data.executionTime
        });

      await fetchExecutions(sessionId);
      return data;
    } catch (error) {
      console.error('Error executing code:', error);
      toast({
        title: 'Error',
        description: 'Failed to execute code',
        variant: 'destructive',
      });
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
        () => {
          fetchExecutions(sessionId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, fetchExecutions]);

  // Initial data fetch
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (sessionId) {
      fetchSession(sessionId);
      fetchExecutions(sessionId);
    }
  }, [sessionId, fetchSession, fetchExecutions]);

  return {
    session,
    sessions,
    executions,
    participants,
    loading,
    updateSessionCode,
    createSession,
    executeCode,
    fetchSessions,
    fetchSession,
    fetchExecutions
  };
};
