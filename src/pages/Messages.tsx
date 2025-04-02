
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Send, User, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  timestamp: string;
  sender_name?: string;
  isMe?: boolean;
}

interface Contact {
  id: string;
  full_name: string;
  email: string;
  profile_image_url: string | null;
  lastMessage?: string;
  unread?: number;
  isActive?: boolean;
}

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [activeContact, setActiveContact] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, userData } = useAuth();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch contacts (all users except current user)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('id', user.id);
        
        if (error) {
          console.error('Error fetching contacts:', error);
          return;
        }
        
        // Transform data to match Contact interface
        const contactsData = data.map((contact: any) => ({
          id: contact.id,
          full_name: contact.full_name,
          email: contact.email,
          profile_image_url: contact.profile_image_url,
          // We'll get last messages in a separate query
          lastMessage: '',
          unread: 0,
          isActive: true // For now, set all as active
        }));
        
        setContacts(contactsData);
        
        // If we have contacts, set the first one as active by default
        if (contactsData.length > 0 && !activeContact) {
          setActiveContact(contactsData[0].id);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in fetchContacts:', error);
        setIsLoading(false);
      }
    };
    
    fetchContacts();
  }, [user]);

  // Fetch messages between current user and active contact
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!user || !activeContact) return;
        
        const { data, error } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            text,
            timestamp,
            users!sender_id(full_name)
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .or(`sender_id.eq.${activeContact},receiver_id.eq.${activeContact}`)
          .order('timestamp', { ascending: true });
        
        if (error) {
          console.error('Error fetching messages:', error);
          return;
        }
        
        // Filter to only include messages between the current user and active contact
        const filteredMessages = data.filter((msg: any) => 
          (msg.sender_id === user.id && msg.receiver_id === activeContact) || 
          (msg.sender_id === activeContact && msg.receiver_id === user.id)
        );
        
        // Transform data to match Message interface
        const messagesData = filteredMessages.map((msg: any) => ({
          id: msg.id,
          sender_id: msg.sender_id,
          receiver_id: msg.receiver_id,
          text: msg.text,
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender_name: msg.users?.full_name || 'Unknown',
          isMe: msg.sender_id === user.id
        }));
        
        setMessages(messagesData);
      } catch (error) {
        console.error('Error in fetchMessages:', error);
      }
    };
    
    fetchMessages();
    
    // Set up real-time subscription for new messages
    const messagesSubscription = supabase
      .channel('messages-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        const newMessage = payload.new as Message;
        
        // Only add the message if it's relevant to the current conversation
        if ((newMessage.sender_id === user?.id && newMessage.receiver_id === activeContact) ||
            (newMessage.sender_id === activeContact && newMessage.receiver_id === user?.id)) {
          
          // Format and add isMe property
          const formattedMessage = {
            ...newMessage,
            timestamp: new Date(newMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: newMessage.sender_id === user?.id
          };
          
          setMessages(prev => [...prev, formattedMessage]);
        }
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(messagesSubscription);
    };
  }, [user, activeContact]);

  const handleSendMessage = async () => {
    if (message.trim() === '' || !user || !activeContact) return;
    
    try {
      const newMessage = {
        sender_id: user.id,
        receiver_id: activeContact,
        text: message,
        timestamp: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('messages')
        .insert(newMessage);
      
      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return;
      }
      
      // Clear input after sending
      setMessage('');
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (contactId: string) => {
    setActiveContact(contactId);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <AlertCircle className="w-12 h-12 text-primary/50 mb-4" />
      <h3 className="text-xl font-medium mb-2">No messages yet</h3>
      <p className="text-white/60 mb-6 max-w-md">
        You don't have any messages yet. Select a contact to start a conversation.
      </p>
    </div>
  );

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
              {isLoading ? (
                <div className="p-4 text-center text-white/60">Loading contacts...</div>
              ) : contacts.length === 0 ? (
                <div className="p-4 text-center text-white/60">No contacts found</div>
              ) : (
                contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/50 border-b border-white/10 ${activeContact === contact.id ? 'bg-accent/50' : ''}`}
                    onClick={() => handleContactClick(contact.id)}
                  >
                    <Avatar className="h-10 w-10 flex items-center justify-center bg-secondary text-white">
                      {contact.profile_image_url ? (
                        <img src={contact.profile_image_url} alt={contact.full_name} />
                      ) : (
                        <User size={20} />
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{contact.full_name}</p>
                        {contact.unread && contact.unread > 0 && (
                          <span className="flex-shrink-0 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/60 truncate">{contact.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
          
          {/* Chat window */}
          <Card className="bg-accent/30 border-accent flex-1 flex flex-col overflow-hidden">
            {activeContact && contacts.length > 0 ? (
              <>
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-secondary text-white">
                    {contacts.find(c => c.id === activeContact)?.profile_image_url ? (
                      <img 
                        src={contacts.find(c => c.id === activeContact)?.profile_image_url || ''} 
                        alt={contacts.find(c => c.id === activeContact)?.full_name} 
                      />
                    ) : (
                      <User size={20} />
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{contacts.find(c => c.id === activeContact)?.full_name}</p>
                    <p className="text-xs text-white/60">
                      {contacts.find(c => c.id === activeContact)?.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-white/60 p-4">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${msg.isMe ? 'bg-primary text-primary-foreground' : 'bg-secondary/40'} rounded-lg p-3`}>
                          <div className="flex justify-between items-baseline gap-4">
                            <p className="text-xs font-medium">
                              {msg.isMe ? 'You' : contacts.find(c => c.id === msg.sender_id)?.full_name}
                            </p>
                            <span className="text-xs opacity-70">{msg.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm">{msg.text}</p>
                        </div>
                      </div>
                    ))
                  )}
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
              </>
            ) : (
              <EmptyState />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
