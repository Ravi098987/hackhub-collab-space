
-- Create chat_rooms table
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  room_type TEXT NOT NULL DEFAULT 'public' CHECK (room_type IN ('public', 'private', 'team')),
  team_id UUID,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'code', 'file', 'system')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create code_sessions table
CREATE TABLE public.code_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL DEFAULT 'javascript',
  code TEXT DEFAULT '',
  owner_id UUID NOT NULL,
  team_id UUID,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create code_executions table
CREATE TABLE public.code_executions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.code_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  output TEXT,
  error_message TEXT,
  execution_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create code_session_participants table
CREATE TABLE public.code_session_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.code_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, user_id)
);

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for chat_rooms
CREATE POLICY "Users can view public chat rooms" ON public.chat_rooms
  FOR SELECT USING (room_type = 'public');

CREATE POLICY "Users can view private chat rooms they created" ON public.chat_rooms
  FOR SELECT USING (room_type = 'private' AND created_by = auth.uid());

CREATE POLICY "Users can view team chat rooms of their teams" ON public.chat_rooms
  FOR SELECT USING (room_type = 'team' AND team_id IN (
    SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "Authenticated users can create chat rooms" ON public.chat_rooms
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Room creators can update their rooms" ON public.chat_rooms
  FOR UPDATE USING (created_by = auth.uid());

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view messages in accessible rooms" ON public.chat_messages
  FOR SELECT USING (
    room_id IN (
      SELECT id FROM public.chat_rooms WHERE 
        room_type = 'public' OR 
        (room_type = 'private' AND created_by = auth.uid()) OR
        (room_type = 'team' AND team_id IN (
          SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
        ))
    )
  );

CREATE POLICY "Users can create messages in accessible rooms" ON public.chat_messages
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    room_id IN (
      SELECT id FROM public.chat_rooms WHERE 
        room_type = 'public' OR 
        (room_type = 'private' AND created_by = auth.uid()) OR
        (room_type = 'team' AND team_id IN (
          SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
        ))
    )
  );

-- Create RLS policies for code_sessions
CREATE POLICY "Users can view public code sessions" ON public.code_sessions
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own code sessions" ON public.code_sessions
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Users can view team code sessions" ON public.code_sessions
  FOR SELECT USING (team_id IN (
    SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
  ));

CREATE POLICY "Authenticated users can create code sessions" ON public.code_sessions
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Session owners can update their sessions" ON public.code_sessions
  FOR UPDATE USING (owner_id = auth.uid());

-- Create RLS policies for code_executions
CREATE POLICY "Users can view executions of accessible sessions" ON public.code_executions
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM public.code_sessions WHERE 
        is_public = true OR 
        owner_id = auth.uid() OR
        team_id IN (
          SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
        )
    )
  );

CREATE POLICY "Users can create executions in accessible sessions" ON public.code_executions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    session_id IN (
      SELECT id FROM public.code_sessions WHERE 
        is_public = true OR 
        owner_id = auth.uid() OR
        team_id IN (
          SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
        )
    )
  );

-- Create RLS policies for teams
CREATE POLICY "Users can view teams they belong to" ON public.teams
  FOR SELECT USING (
    id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create teams" ON public.teams
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team creators can update their teams" ON public.teams
  FOR UPDATE USING (created_by = auth.uid());

-- Create RLS policies for team_members
CREATE POLICY "Users can view members of their teams" ON public.team_members
  FOR SELECT USING (
    team_id IN (SELECT team_id FROM public.team_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Team admins can manage team members" ON public.team_members
  FOR ALL USING (
    team_id IN (
      SELECT team_id FROM public.team_members 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Add triggers for updated_at columns
CREATE TRIGGER update_chat_rooms_updated_at
  BEFORE UPDATE ON public.chat_rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_code_sessions_updated_at
  BEFORE UPDATE ON public.code_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for chat functionality
ALTER TABLE public.chat_rooms REPLICA IDENTITY FULL;
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.code_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.code_executions REPLICA IDENTITY FULL;
