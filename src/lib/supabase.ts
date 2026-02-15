// This "Mock" satisfies the app logic without needing a real database
export const supabase = {
  auth: { 
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({ data: [], error: null, single: () => ({ data: null, error: null }) }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    upsert: () => ({ data: null, error: null })
  })
};
