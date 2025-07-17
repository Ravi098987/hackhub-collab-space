
export interface ChatRoom {
  id: string;
  name: string;
  description: string | null;
  room_type: 'public' | 'private' | 'team';
  team_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  message_type: 'text' | 'code' | 'file' | 'system';
  metadata: Record<string, any>;
  created_at: string;
  profiles?: {
    display_name: string | null;
    email: string | null;
  };
}

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

export interface CodeSessionParticipant {
  id: string;
  session_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  joined_at: string;
}

export interface Team {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'admin' | 'member' | 'viewer';
  joined_at: string;
}
