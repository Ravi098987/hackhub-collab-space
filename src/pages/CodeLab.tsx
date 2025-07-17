
import { useState } from 'react';
import { CollaborativeCodeEditor } from '@/components/CollaborativeCodeEditor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function CodeLab() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
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
            <h1 className="text-3xl font-bold">Code Lab</h1>
            <p className="text-muted-foreground">
              Collaborative coding environment with real-time synchronization
            </p>
          </div>
          
          <div className="h-[calc(100vh-200px)] border rounded-lg overflow-hidden">
            <CollaborativeCodeEditor 
              sessionId={selectedSessionId}
              onSessionSelect={setSelectedSessionId}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
