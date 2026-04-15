// Minimal supabase helper used by the demo app.
// In the real app this would wrap @supabase/supabase-js client.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  profiles?: {
    id?: string;
    full_name?: string;
    grade_level?: number;
    is_tutor?: boolean;
  } | null;
}

export default supabase;
