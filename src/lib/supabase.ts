import { createClient } from '@supabase/supabase-js';

// Server-only admin client. Uses the Supabase secret key, which bypasses RLS.
// All document reads/writes go through this on the server — the browser never
// queries the documents table directly (RLS is ON with no policies).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
