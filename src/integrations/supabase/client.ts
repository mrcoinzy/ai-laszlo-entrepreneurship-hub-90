
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://boufwkgxsnuomuczeszw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdWZ3a2d4c251b211Y3plc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDQ4NjksImV4cCI6MjA1ODgyMDg2OX0.359BumteZ-7Br3jDToh7b2LUBhsG1Y7L92jPkVCLhQk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
