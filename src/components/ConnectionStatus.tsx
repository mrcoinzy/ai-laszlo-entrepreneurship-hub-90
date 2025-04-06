
import React, { useEffect, useState } from 'react';
import { supabase, testConnection } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  
  const checkConnection = async () => {
    try {
      const result = await testConnection();
      setStatus(result.success ? 'connected' : 'disconnected');
    } catch (error) {
      console.error('Connection check error:', error);
      setStatus('disconnected');
    }
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(() => {
      checkConnection();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help" onClick={checkConnection}>
            <Badge variant={status === 'connected' ? 'outline' : 'destructive'} className="ml-2">
              {status === 'connected' ? (
                <><Wifi className="h-3 w-3 mr-1" /> Connected</>
              ) : status === 'connecting' ? (
                <span className="flex items-center">
                  <span className="animate-pulse mr-1">•</span> Connecting
                </span>
              ) : (
                <><WifiOff className="h-3 w-3 mr-1" /> Disconnected</>
              )}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Supabase connection status</p>
          <p className="text-xs text-muted-foreground">Last checked: {lastChecked.toLocaleTimeString()}</p>
          <p className="text-xs">Click to check again</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConnectionStatus;
