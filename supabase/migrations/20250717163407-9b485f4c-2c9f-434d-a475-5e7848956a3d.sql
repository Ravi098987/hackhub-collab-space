
-- Create chat rooms table
CREATE TABLE public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  room_type TEXT NOT NULL DEFAULT 'public', -- 'public', 'private', 'team'
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- 'text', 'code', 'file', 'system'
  metadata JSONB DEFAULT '{}', -- Store code language, file info, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create code sessions table for collaborative coding
CREATE TABLE public.code_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL DEFAULT 'javascript',
  code TEXT DEFAULT '',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create code session participants table
CREATE TABLE public.code_session_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.code_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'viewer', -- 'owner', 'editor', 'viewer'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Create code execution history table
CREATE TABLE public.code_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.code_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  output TEXT,
  error_message TEXT,
  execution_time INTEGER, -- milliseconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_executions ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_rooms
CREATE POLICY "Users can view public chat rooms" ON public.chat_rooms FOR SELECT TO authenticated USING (room_type = 'public');
CREATE POLICY "Team members can view team chat rooms" ON public.chat_rooms FOR SELECT TO authenticated USING (
  room_type = 'team' AND team_id IN (
    SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
  )
);
CREATE POLICY "Users can create chat rooms" ON public.chat_rooms FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Room creators can manage their rooms" ON public.chat_rooms FOR ALL TO authenticated USING (auth.uid() = created_by);

-- RLS policies for chat_messages
CREATE POLICY "Users can view messages in accessible rooms" ON public.chat_messages FOR SELECT TO authenticated USING (
  room_id IN (
    SELECT id FROM public.chat_rooms WHERE 
    room_type = 'public' OR 
    (room_type = 'team' AND team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    ))
  )
);
CREATE POLICY "Users can send messages to accessible rooms" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = user_id AND room_id IN (
    SELECT id FROM public.chat_rooms WHERE 
    room_type = 'public' OR 
    (room_type = 'team' AND team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    ))
  )
);

-- RLS policies for code_sessions
CREATE POLICY "Users can view public code sessions" ON public.code_sessions FOR SELECT TO authenticated USING (is_public = true);
CREATE POLICY "Team members can view team code sessions" ON public.code_sessions FOR SELECT TO authenticated USING (
  team_id IN (
    SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
  )
);
CREATE POLICY "Session participants can view sessions" ON public.code_sessions FOR SELECT TO authenticated USING (
  id IN (
    SELECT session_id FROM public.code_session_participants WHERE user_id = auth.uid()
  )
);
CREATE POLICY "Users can create code sessions" ON public.code_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Session owners can manage their sessions" ON public.code_sessions FOR ALL TO authenticated USING (auth.uid() = owner_id);

-- RLS policies for code_session_participants
CREATE POLICY "Users can view session participants" ON public.code_session_participants FOR SELECT TO authenticated USING (
  session_id IN (
    SELECT id FROM public.code_sessions WHERE 
    is_public = true OR 
    owner_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  )
);
CREATE POLICY "Users can join sessions" ON public.code_session_participants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave sessions" ON public.code_session_participants FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS policies for code_executions
CREATE POLICY "Users can view executions in accessible sessions" ON public.code_executions FOR SELECT TO authenticated USING (
  session_id IN (
    SELECT id FROM public.code_sessions WHERE 
    is_public = true OR 
    owner_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  )
);
CREATE POLICY "Users can create executions" ON public.code_executions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Enable realtime for chat and code collaboration
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.code_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.code_executions REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.code_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.code_executions;

-- Create updated_at triggers
CREATE TRIGGER update_chat_rooms_updated_at BEFORE UPDATE ON public.chat_rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_code_sessions_updated_at BEFORE UPDATE ON public.code_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
