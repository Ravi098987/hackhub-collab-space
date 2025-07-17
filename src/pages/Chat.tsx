
import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ThemeProvider>
      <div className="h-screen bg-background">
        <div className="container mx-auto h-full py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Team Chat</h1>
            <p className="text-muted-foreground">
              Collaborate with your team in real-time
            </p>
          </div>
          
          <div className="h-[calc(100vh-200px)] border rounded-lg overflow-hidden">
            <ChatInterface 
              roomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
