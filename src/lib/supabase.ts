
import { supabase as originalSupabase } from '@/integrations/supabase/client';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

// Export the original supabase client for backward compatibility
export { originalSupabase as supabase };

// IMPORTANT: Because the Database type definition in types.ts is auto-generated and we've
// created new tables, we need to create a custom client that can work with them

// Define the Supabase URL and key
const SUPABASE_URL = "https://jffkwmrwwmmmlbaazvry.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZmt3bXJ3d21tbWxiYWF6dnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTgzNTcsImV4cCI6MjA2MDYzNDM1N30.KeyC24HRq6xw8zbZ4Dp_jYX_jTqLZRx6Me2dWdsZ0vs";

// Helper function to test connection to Supabase
export const testConnection = async () => {
  try {
    console.log('Testing connection to Supabase...');
    const { data, error } = await supabaseAdmin
      .from('consultations')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection test successful:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Supabase connection test exception:', err);
    return { success: false, error: err };
  }
};

// Create a client that can work with custom tables
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
