
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';
import { Send, MessageCircle, Code, Users, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChatInterfaceProps {
  roomId: string | null;
  onRoomSelect: (roomId: string) => void;
}

export const ChatInterface = ({ roomId, onRoomSelect }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDesc, setNewRoomDesc] = useState('');
  const [newRoomType, setNewRoomType] = useState<'public' | 'private' | 'team'>('public');
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { messages, rooms, loading, sendMessage, createRoom } = useChat(roomId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(message);
      setMessage('');
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      await createRoom(newRoomName, newRoomDesc, newRoomType);
      setNewRoomName('');
      setNewRoomDesc('');
      setNewRoomType('public');
      setShowCreateRoom(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="w-3 h-3" />;
      case 'system':
        return <Users className="w-3 h-3" />;
      default:
        return <MessageCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar - Chat Rooms */}
      <div className="w-64 border-r bg-muted/30">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Chat Rooms</h3>
            <Dialog open={showCreateRoom} onOpenChange={setShowCreateRoom}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Chat Room</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <Input
                    placeholder="Room name"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Room description (optional)"
                    value={newRoomDesc}
                    onChange={(e) => setNewRoomDesc(e.target.value)}
                  />
                  <Select value={newRoomType} onValueChange={(value: 'public' | 'private' | 'team') => setNewRoomType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full">
                    Create Room
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {rooms.map((room) => (
                <Card
                  key={room.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    roomId === room.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => onRoomSelect(room.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{room.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {room.room_type}
                      </Badge>
                    </div>
                    {room.description && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {room.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {roomId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h2 className="font-semibold">
                  {rooms.find(r => r.id === roomId)?.name || 'Chat Room'}
                </h2>
                <Badge variant="outline">
                  {rooms.find(r => r.id === roomId)?.room_type || 'public'}
                </Badge>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {msg.profiles?.display_name?.[0] || msg.profiles?.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {msg.profiles?.display_name || msg.profiles?.email || 'Unknown User'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(msg.created_at)}
                        </span>
                        <div className="flex items-center gap-1">
                          {getMessageTypeIcon(msg.message_type)}
                          <span className="text-xs text-muted-foreground">
                            {msg.message_type}
                          </span>
                        </div>
                      </div>
                      <div className={`text-sm mt-1 ${
                        msg.message_type === 'code' ? 'bg-muted p-2 rounded font-mono' : ''
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a chat room</h3>
              <p className="text-muted-foreground">
                Choose a room from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
