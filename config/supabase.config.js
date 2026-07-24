const { createClient } = require('@supabase/supabase-js');



const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY, // service role key recommended for server
  
);

module.exports = supabase;
