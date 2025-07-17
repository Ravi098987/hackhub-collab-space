
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useCodeSession } from '@/hooks/useCodeSession';
import { useAuth } from '@/hooks/useAuth';
import { CodeEditor } from '@/components/CodeEditor';
import { Play, Save, Users, Plus, Code, Clock } from 'lucide-react';

interface CollaborativeCodeEditorProps {
  sessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
}

export const CollaborativeCodeEditor = ({ sessionId, onSessionSelect }: CollaborativeCodeEditorProps) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionDesc, setNewSessionDesc] = useState('');
  const [newSessionLang, setNewSessionLang] = useState('javascript');
  const [newSessionPublic, setNewSessionPublic] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  
  const { user } = useAuth();
  const { session, sessions, executions, loading, updateSessionCode, createSession, executeCode } = useCodeSession(sessionId);

  // Debounced code update
  const debouncedUpdateCode = useCallback(
    debounce((newCode: string) => {
      if (sessionId && newCode !== session?.code) {
        updateSessionCode(newCode);
      }
    }, 1000),
    [sessionId, session?.code, updateSessionCode]
  );

  useEffect(() => {
    if (session?.code && session.code !== code) {
      setCode(session.code);
    }
  }, [session?.code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    debouncedUpdateCode(newCode);
  };

  const handleExecuteCode = async () => {
    if (!session || !code.trim()) return;

    setIsExecuting(true);
    try {
      const result = await executeCode(code, session.language);
      if (result) {
        setOutput(result.error || result.output || 'No output');
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSessionName.trim()) {
      await createSession(newSessionName, newSessionDesc, newSessionLang, newSessionPublic);
      setNewSessionName('');
      setNewSessionDesc('');
      setNewSessionLang('javascript');
      setNewSessionPublic(false);
      setShowCreateSession(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex h-full">
      {/* Sidebar - Code Sessions */}
      <div className="w-64 border-r bg-muted/30">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Code Sessions</h3>
            <Dialog open={showCreateSession} onOpenChange={setShowCreateSession}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Code Session</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSession} className="space-y-4">
                  <Input
                    placeholder="Session name"
                    value={newSessionName}
                    onChange={(e) => setNewSessionName(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Session description (optional)"
                    value={newSessionDesc}
                    onChange={(e) => setNewSessionDesc(e.target.value)}
                  />
                  <Select value={newSessionLang} onValueChange={setNewSessionLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="public"
                      checked={newSessionPublic}
                      onChange={(e) => setNewSessionPublic(e.target.checked)}
                    />
                    <label htmlFor="public" className="text-sm">Public session</label>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Session
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {sessions.map((sess) => (
                <Card
                  key={sess.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    sessionId === sess.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => onSessionSelect(sess.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{sess.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {sess.language}
                      </Badge>
                    </div>
                    {sess.description && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {sess.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {sess.is_public && (
                        <Badge variant="outline" className="text-xs">
                          Public
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {sess.owner_id === user?.id ? 'Owner' : 'Participant'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Code Area */}
      <div className="flex-1 flex flex-col">
        {sessionId && session ? (
          <>
            {/* Session Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  <h2 className="font-semibold">{session.name}</h2>
                  <Badge variant="outline">{session.language}</Badge>
                  {session.is_public && (
                    <Badge variant="secondary">Public</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExecuteCode}
                    disabled={isExecuting}
                    size="sm"
                    className="gradient-bg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isExecuting ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button
                    onClick={() => updateSessionCode(code)}
                    variant="outline"
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Editor and Output */}
            <div className="flex-1 p-4">
              <Tabs defaultValue="editor" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="editor">Code Editor</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                  <TabsTrigger value="executions">Execution History</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="h-full mt-4">
                  <div className="h-[600px]">
                    <CodeEditor
                      value={code}
                      onChange={handleCodeChange}
                      language={session.language}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="output" className="h-full mt-4">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle>Output</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-[500px] overflow-auto whitespace-pre-wrap">
                        {output || 'No output yet. Run your code to see results.'}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="executions" className="h-full mt-4">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle>Execution History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {executions.map((execution) => (
                            <div key={execution.id} className="border rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline">{execution.language}</Badge>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {formatTime(execution.created_at)}
                                  {execution.execution_time && (
                                    <span>({execution.execution_time}ms)</span>
                                  )}
                                </div>
                              </div>
                              {execution.error_message ? (
                                <div className="bg-red-100 text-red-800 p-2 rounded text-sm">
                                  Error: {execution.error_message}
                                </div>
                              ) : (
                                <div className="bg-green-100 text-green-800 p-2 rounded text-sm font-mono">
                                  {execution.output || 'No output'}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a code session</h3>
              <p className="text-muted-foreground">
                Choose a session from the sidebar to start coding
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple debounce utility
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
