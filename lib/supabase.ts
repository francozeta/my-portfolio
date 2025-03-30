import { createClient } from "@supabase/supabase-js"

// Verificar si las variables de entorno están disponibles
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Función para verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && !!supabaseServiceKey
}

// Crear clientes de Supabase solo si las variables están configuradas
export const supabaseAdmin = isSupabaseConfigured() ? createClient(supabaseUrl!, supabaseServiceKey!) : null

export const supabaseClient = isSupabaseConfigured() ? createClient(supabaseUrl!, supabaseAnonKey!) : null

