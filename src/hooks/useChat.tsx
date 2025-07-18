
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ChatRoom, ChatMessage } from '@/types/chat';

export const useChat = (roomId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch chat rooms
  const fetchRooms = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_rooms' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data as unknown as ChatRoom[] || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat rooms',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Fetch messages for a room
  const fetchMessages = useCallback(async (roomId: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages' as any)
        .select(`
          *,
          profiles!inner(display_name, email)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data as unknown as ChatMessage[] || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Send a message
  const sendMessage = async (message: string, messageType: 'text' | 'code' = 'text', metadata: any = {}) => {
    if (!user || !roomId || !message.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages' as any)
        .insert({
          room_id: roomId,
          user_id: user.id,
          message: message.trim(),
          message_type: messageType,
          metadata
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  // Create a new room
  const createRoom = async (name: string, description: string = '', roomType: 'public' | 'private' | 'team' = 'public', teamId: string | null = null) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_rooms' as any)
        .insert({
          name,
          description,
          room_type: roomType,
          team_id: teamId,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchRooms();
      toast({
        title: 'Success',
        description: 'Chat room created successfully',
      });
      
      return data;
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: 'Error',
        description: 'Failed to create chat room',
        variant: 'destructive',
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        async (payload) => {
          // Fetch the complete message with profile info
          const { data } = await supabase
            .from('chat_messages' as any)
            .select(`
              *,
              profiles!inner(display_name, email)
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setMessages(prev => [...prev, data as unknown as ChatMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Initial data fetch
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (roomId) {
      fetchMessages(roomId);
    }
  }, [roomId, fetchMessages]);

  return {
    messages,
    rooms,
    loading,
    sendMessage,
    createRoom,
    fetchRooms,
    fetchMessages
  };
};
