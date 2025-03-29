
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User,
  Send,
  Clock
} from "lucide-react";
import { toast } from "sonner";

// Mock client data for the messaging interface
const mockClients = [
  { id: 1, name: "Jane Cooper", lastMessage: "Thanks for the update on the project!" },
  { id: 2, name: "Wade Warren", lastMessage: "When will the next milestone be ready?" },
  { id: 3, name: "Esther Howard", lastMessage: "The marketing plan looks great." }
];

// Mock conversation data
const mockConversations: Record<number, Array<{ id: number, sender: 'client' | 'admin', text: string, timestamp: string }>> = {
  1: [
    { id: 1, sender: 'client', text: "Hi, I had a question about the e-commerce feature we discussed.", timestamp: "2023-06-15 09:30" },
    { id: 2, sender: 'admin', text: "Hello Jane, I'd be happy to answer your question. What specifically about the e-commerce feature were you wondering about?", timestamp: "2023-06-15 09:45" },
    { id: 3, sender: 'client', text: "I was wondering if we could add a wishlist feature for customers.", timestamp: "2023-06-15 10:00" },
    { id: 4, sender: 'admin', text: "Absolutely! A wishlist feature would be a great addition. I'll include it in the next phase of development and send you a mockup by tomorrow.", timestamp: "2023-06-15 10:15" },
    { id: 5, sender: 'client', text: "Thanks for the update on the project!", timestamp: "2023-06-15 10:30" }
  ],
  2: [
    { id: 1, sender: 'client', text: "Hello, I'd like to check on the progress of the fitness app.", timestamp: "2023-06-14 14:20" },
    { id: 2, sender: 'admin', text: "Hi Wade, we're making good progress. The UI is completed and we're now working on the API integration.", timestamp: "2023-06-14 14:35" },
    { id: 3, sender: 'client', text: "That sounds good. When will the next milestone be ready?", timestamp: "2023-06-14 15:00" }
  ],
  3: [
    { id: 1, sender: 'admin', text: "Hi Esther, I've completed the first draft of your marketing plan. You can view it in the shared folder.", timestamp: "2023-06-13 11:15" },
    { id: 2, sender: 'client', text: "Got it, I'll take a look today.", timestamp: "2023-06-13 11:30" },
    { id: 3, sender: 'client', text: "The marketing plan looks great.", timestamp: "2023-06-13 13:45" }
  ]
};

const MessagingInterface = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [messages, setMessages] = useState<typeof mockConversations[number]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Load conversation for a client
  const loadConversation = (clientId: number) => {
    setSelectedClient(clientId);
    setMessages(mockConversations[clientId] || []);
  };
  
  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;
    
    // In a real app, this would send the message to an API
    const newMessageObj = {
      id: messages.length + 1,
      sender: 'admin' as const,
      text: newMessage,
      timestamp: new Date().toLocaleString()
    };
    
    // Update the messages state
    setMessages(prev => [...prev, newMessageObj]);
    setNewMessage("");
    
    toast.success("Message sent successfully!");
  };
  
  // Handle input keypress to send on Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(85vh-100px)] flex flex-col">
      <Card className="bg-accent/30 border-accent h-full">
        <CardHeader className="pb-4">
          <CardTitle>Client Messages</CardTitle>
          <CardDescription>Communicate with your clients in real-time</CardDescription>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div className="flex h-full">
            {/* Client List */}
            <div className="w-1/3 border-r border-white/10 h-full overflow-y-auto px-2">
              <div className="p-2 sticky top-0 bg-accent/30 z-10">
                <Input 
                  placeholder="Search clients..." 
                  className="bg-secondary/50"
                />
              </div>
              <div className="space-y-1 mt-2">
                {mockClients.map(client => (
                  <Button
                    key={client.id}
                    variant="ghost"
                    className={`w-full justify-start px-2 py-3 h-auto ${
                      selectedClient === client.id ? 'bg-primary/20' : ''
                    }`}
                    onClick={() => loadConversation(client.id)}
                  >
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{client.name}</div>
                        <div className="text-xs text-white/70 truncate w-48">{client.lastMessage}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Message Area */}
            <div className="w-2/3 flex flex-col h-full">
              {selectedClient ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-3 border-b border-white/10 bg-accent/20">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {mockClients.find(c => c.id === selectedClient)?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'admin' 
                              ? 'bg-primary/20 text-white' 
                              : 'bg-accent/40 text-white/90'
                          }`}
                        >
                          <div className="text-sm">{message.text}</div>
                          <div className="text-xs text-white/50 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-3 border-t border-white/10">
                    <div className="flex space-x-2">
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message..."
                        className="min-h-[60px] bg-secondary/50"
                      />
                      <Button 
                        onClick={sendMessage}
                        className="mt-auto"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  Select a client to start messaging
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingInterface;
