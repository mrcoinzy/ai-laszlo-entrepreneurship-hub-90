
import { supabase } from '@/integrations/supabase/client';

// Export the supabase client for backward compatibility
export { supabase };

// Helper function to test connection to Supabase
export const testConnection = async () => {
  try {
    console.log('Testing connection to Supabase...');
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
