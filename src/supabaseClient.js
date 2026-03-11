import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbrhuvoemsyhyudkjapl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icmh1dm9lbXN5aHl1ZGtqYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDQyOTMsImV4cCI6MjA4ODgyMDI5M30.08mFHZgLe0sQm-UX3rikGzU3SuiYSPB5I5SyO3-zN4o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
