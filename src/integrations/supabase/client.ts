// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ctsazivxabpusgttrnjr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c2F6aXZ4YWJwdXNndHRybmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNTI2OTIsImV4cCI6MjA1MzYyODY5Mn0.w95ch-K2HQZrYFr_LWXE8ncnTWmWSM_ruE_-ylUcTz4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);