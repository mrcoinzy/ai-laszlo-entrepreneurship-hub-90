
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Send, User } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  isActive: boolean;
}

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [activeContact, setActiveContact] = useState(1);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock data for contacts
  const contacts: Contact[] = [
    { id: 1, name: "John Doe", lastMessage: "Thanks for your help!", unread: 0, isActive: true },
    { id: 2, name: "Jane Smith", lastMessage: "When can we schedule a call?", unread: 2, isActive: false },
    { id: 3, name: "Mike Johnson", lastMessage: "Project update needed", unread: 0, isActive: true },
    { id: 4, name: "Sarah Williams", lastMessage: "Invoice received, thanks!", unread: 1, isActive: true },
  ];

  // Mock data for messages
  const messages: Message[] = [
    { id: 1, sender: "John Doe", content: "Hello! I have a question about my project.", timestamp: "09:30 AM", isMe: false },
    { id: 2, sender: "Me", content: "Hi John, what can I help you with?", timestamp: "09:32 AM", isMe: true },
    { id: 3, sender: "John Doe", content: "I was wondering if we could add another feature to the dashboard.", timestamp: "09:35 AM", isMe: false },
    { id: 4, sender: "Me", content: "Of course! What feature did you have in mind?", timestamp: "09:40 AM", isMe: true },
    { id: 5, sender: "John Doe", content: "I'd like to add a calendar view to track project deadlines.", timestamp: "09:45 AM", isMe: false },
    { id: 6, sender: "Me", content: "That's a great idea. I can definitely implement that for you. When would you need it by?", timestamp: "09:48 AM", isMe: true },
    { id: 7, sender: "John Doe", content: "Ideally by the end of the month. Is that doable?", timestamp: "09:52 AM", isMe: false },
    { id: 8, sender: "Me", content: "Yes, I can have it ready for you by then. I'll start working on it next week.", timestamp: "09:55 AM", isMe: true },
    { id: 9, sender: "John Doe", content: "Perfect! Thanks for your help!", timestamp: "10:00 AM", isMe: false },
  ];

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // In a real app, you would send the message to the backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (contactId: number) => {
    setActiveContact(contactId);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">Messages</h1>
          <p className="text-white/70 mt-2">Communicate with your clients</p>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-4 p-4 md:px-8 md:pb-8">
          {/* Contact list */}
          <Card className="bg-accent/30 border-accent md:w-80 shrink-0 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10">
              <Input 
                placeholder="Search contacts..." 
                className="bg-secondary/50"
              />
            </div>
            <div className="flex-1 overflow-auto">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/50 border-b border-white/10 ${activeContact === contact.id ? 'bg-accent/50' : ''}`}
                  onClick={() => handleContactClick(contact.id)}
                >
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-secondary text-white">
                    <User size={20} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.unread > 0 && (
                        <span className="flex-shrink-0 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 truncate">{contact.lastMessage}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" 
                       style={{ visibility: contact.isActive ? 'visible' : 'hidden' }}></div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Chat window */}
          <Card className="bg-accent/30 border-accent flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Avatar className="h-10 w-10 flex items-center justify-center bg-secondary text-white">
                <User size={20} />
              </Avatar>
              <div>
                <p className="font-medium">{contacts.find(c => c.id === activeContact)?.name}</p>
                <p className="text-xs text-white/60">
                  {contacts.find(c => c.id === activeContact)?.isActive ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.isMe ? 'bg-primary text-primary-foreground' : 'bg-secondary/40'} rounded-lg p-3`}>
                    <div className="flex justify-between items-baseline gap-4">
                      <p className="text-xs font-medium">{msg.sender}</p>
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[60px] bg-secondary/50"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button className="flex-shrink-0" onClick={handleSendMessage}>
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
