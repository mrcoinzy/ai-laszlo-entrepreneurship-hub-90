
import { createClient } from '@supabase/supabase-js';

// Use consistent Supabase URL and key across the application
const supabaseUrl = 'https://boufwkgxsnuomuczeszw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZ3a2d4c251b211Y3plc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDQ4NjksImV4cCI6MjA1ODgyMDg2OX0.359BumteZ-7Br3jDToh7b2LUBhsG1Y7L92jPkVCLhQk';

console.log('Initializing Supabase client with URL:', supabaseUrl);

// Create and export a single Supabase client instance with auth disabled for public access
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Helper function to test connection to Supabase
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
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
