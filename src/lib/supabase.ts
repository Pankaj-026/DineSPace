import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dgyrobkkikllfcfnykma.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRneXJvYmtraWtsbGZjZm55a21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MzE5NjYsImV4cCI6MjA1MTMwNzk2Nn0.rMLSzAt_CqCGtg5NldjpnJyULjgdgBibcNA4_SCKoHU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})