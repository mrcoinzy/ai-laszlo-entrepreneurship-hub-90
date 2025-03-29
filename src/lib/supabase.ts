
import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZ3a2d4c251b211Y3plc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDQ4NjksImV4cCI6MjA1ODgyMDg2OX0.359BumteZ-7Br3jDToh7b2LUBhsG1Y7L92jPkVCLhQk';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZ3a2d4c251b211Y3plc3p3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI0NDg2OSwiZXhwIjoyMDU4ODIwODY5fQ.q_CauB_xA6vmwS6lVHfcAbx7hM11uxzgQZFXglEjJa0';

// Comment out this check since we now have default values
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

console.log('Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
